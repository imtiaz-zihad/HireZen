import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError, NotFoundError } from "@/lib/api-utils";
import { resumeRepository } from "@/lib/repositories/resume.repository";

const utapi = new UTApi();

export const PATCH = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const resume = await resumeRepository.setDefault(params.id, session.user.id);
  if (!resume) throw new NotFoundError("Resume not found");

  return NextResponse.json({ message: "Default resume updated" });
});

export const DELETE = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const resume = await resumeRepository.findById(params.id, session.user.id);
  if (!resume) throw new NotFoundError("Resume not found");

  await utapi.deleteFiles(resume.fileKey);
  await resumeRepository.delete(params.id, session.user.id);

  return NextResponse.json({ message: "Resume deleted" });
});