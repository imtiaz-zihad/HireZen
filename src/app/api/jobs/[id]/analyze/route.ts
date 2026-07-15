import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";
import { withErrorHandler, UnauthorizedError, NotFoundError } from "@/lib/api-utils";
import { jobRepository } from "@/lib/repositories/job.repository";
import { checkAndIncrementAiUsage } from "@/lib/ai-usage";
import { aiAnalysisResultSchema } from "@/lib/validations/ai-analysis";

export const POST = withErrorHandler(async (req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const job = await jobRepository.findById(params.id, session.user.id);
  if (!job) throw new NotFoundError("Job not found");

  const body = await req.json().catch(() => ({}));
  const resumeId = body.resumeId as string | undefined;

  const resume = resumeId
    ? await prisma.resume.findFirst({ where: { id: resumeId, userId: session.user.id } })
    : await prisma.resume.findFirst({ where: { userId: session.user.id, isDefault: true } });

  if (!resume) {
    return NextResponse.json(
      { error: "No resume found. Upload a resume first." },
      { status: 400 }
    );
  }

  if (!resume.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json(
      {
        error:
          "AI analysis currently supports PDF resumes only. Upload a PDF version to use this feature.",
      },
      { status: 400 }
    );
  }

  const usage = await checkAndIncrementAiUsage(session.user.id, "resume_match");
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error:
          "You've used all 3 AI scans this month on the Free plan. Upgrade to Pro for unlimited scans.",
      },
      { status: 403 }
    );
  }

  const fileRes = await fetch(resume.fileUrl);
  const arrayBuffer = await fileRes.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const jobDescription = [
    `Company: ${job.company}`,
    `Role: ${job.role}`,
    job.location ? `Location: ${job.location}` : "",
    job.notes ? `Notes: ${job.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: { type: "base64", media_type: "application/pdf", data: base64 },
          },
          {
            type: "text",
            text: `Here is a job description:\n\n${jobDescription}\n\nCompare the attached resume against this job description. Respond ONLY with valid JSON, no markdown formatting, no preamble, in this exact shape:\n{\n  "matchScore": <number 0-100>,\n  "strengths": [<up to 5 short strings specific to this resume and job>],\n  "missingSkills": [<up to 5 short strings the job wants but the resume lacks>],\n  "suggestions": [<up to 5 short, actionable strings to improve the resume for this job>]\n}`,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  const parsed = aiAnalysisResultSchema.parse(JSON.parse(cleaned));

  const analysis = await prisma.aiAnalysis.create({
    data: {
      jobId: job.id,
      resumeId: resume.id,
      matchScore: parsed.matchScore,
      strengths: parsed.strengths,
      missingSkills: parsed.missingSkills,
      suggestions: parsed.suggestions,
      rawResponse: textBlock.text,
    },
  });

  return NextResponse.json({ analysis, remaining: usage.remaining });
});