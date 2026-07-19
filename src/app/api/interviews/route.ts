import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError } from "@/lib/api-utils";
import { interviewRepository } from "@/lib/repositories/interview.repository";
import { interviewSchema } from "@/lib/validations/interview";

export const GET = withErrorHandler(async () => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const interviews = await interviewRepository.findAllByUser(session.user.id);
  return NextResponse.json({ interviews });
});

export const POST = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = interviewSchema.parse(body);

  const interview = await interviewRepository.create(session.user.id, data);
  if (!interview) {
    return NextResponse.json({ error: "Job not found" }, { status: 400 });
  }

  return NextResponse.json({ interview }, { status: 201 });
});