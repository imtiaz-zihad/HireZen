import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError } from "@/lib/api-utils";
import { jobRepository } from "@/lib/repositories/job.repository";
import { jobSchema } from "@/lib/validations/job";
import type { JobStatus } from "@prisma/client";

export const GET = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as JobStatus | null;

  const jobs = await jobRepository.findAllByUser(
    session.user.id,
    status || undefined
  );

  return NextResponse.json({ jobs });
});

export const POST = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = jobSchema.parse(body);

  const count = await jobRepository.count(session.user.id);
  if (count >= 10) {
    return NextResponse.json(
      { error: "Free plan limit reached (10 jobs). Upgrade to Pro for unlimited tracking." },
      { status: 403 }
    );
  }

  const job = await jobRepository.create(session.user.id, data);
  return NextResponse.json({ job }, { status: 201 });
});