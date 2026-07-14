import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError, NotFoundError } from "@/lib/api-utils";
import { jobRepository } from "@/lib/repositories/job.repository";
import { jobSchema } from "@/lib/validations/job";

export const GET = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const job = await jobRepository.findById(params.id, session.user.id);
  if (!job) throw new NotFoundError("Job not found");

  return NextResponse.json({ job });
});

export const PATCH = withErrorHandler(async (req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = jobSchema.parse(body);

  const job = await jobRepository.update(params.id, session.user.id, data);
  if (!job) throw new NotFoundError("Job not found");

  return NextResponse.json({ job });
});

export const DELETE = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const job = await jobRepository.delete(params.id, session.user.id);
  if (!job) throw new NotFoundError("Job not found");

  return NextResponse.json({ message: "Job deleted" });
});