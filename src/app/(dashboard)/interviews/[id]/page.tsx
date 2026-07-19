import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { interviewRepository } from "@/lib/repositories/interview.repository";
import { InterviewForm } from "@/components/dashboard/interview-form";
import { DeleteInterviewButton } from "@/components/dashboard/delete-interview-button";

export default async function InterviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const interview = await interviewRepository.findById(id, session!.user.id);
  if (!interview) notFound();

  const jobs = await prisma.job.findMany({
    where: { userId: session!.user.id },
    select: { id: true, company: true, role: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            {interview.job.company} — {interview.job.role}
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            {new Date(interview.scheduledAt).toLocaleString()}
          </p>
        </div>
        <DeleteInterviewButton interviewId={interview.id} />
      </div>

      <div className="card-base">
        <InterviewForm
          interviewId={interview.id}
          jobs={jobs}
          defaultValues={{
            jobId: interview.jobId,
            type: interview.type,
            scheduledAt: new Date(interview.scheduledAt).toISOString().slice(0, 16),
            meetingLink: interview.meetingLink ?? "",
            notes: interview.notes ?? "",
            feedback: interview.feedback ?? "",
            result: interview.result ?? "",
          }}
        />
      </div>
    </div>
  );
}