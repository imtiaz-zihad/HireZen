import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError, NotFoundError } from "@/lib/api-utils";
import { interviewRepository } from "@/lib/repositories/interview.repository";
import { interviewSchema } from "@/lib/validations/interview";

export const GET = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const interview = await interviewRepository.findById(params.id, session.user.id);
  if (!interview) throw new NotFoundError("Interview not found");

  return NextResponse.json({ interview });
});

export const PATCH = withErrorHandler(async (req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = interviewSchema.parse(body);

  const interview = await interviewRepository.update(params.id, session.user.id, data);
  if (!interview) throw new NotFoundError("Interview not found");

  return NextResponse.json({ interview });
});

export const DELETE = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const interview = await interviewRepository.delete(params.id, session.user.id);
  if (!interview) throw new NotFoundError("Interview not found");

  return NextResponse.json({ message: "Interview deleted" });
});