import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError } from "@/lib/api-utils";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { contactSchema } from "@/lib/validations/contact";

export const GET = withErrorHandler(async () => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const contacts = await contactRepository.findAllByUser(session.user.id);
  return NextResponse.json({ contacts });
});

export const POST = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = contactSchema.parse(body);

  const contact = await contactRepository.create(session.user.id, data);
  return NextResponse.json({ contact }, { status: 201 });
});