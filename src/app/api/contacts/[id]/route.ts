import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withErrorHandler, UnauthorizedError, NotFoundError } from "@/lib/api-utils";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { contactSchema } from "@/lib/validations/contact";

export const PATCH = withErrorHandler(async (req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = contactSchema.parse(body);

  const contact = await contactRepository.update(params.id, session.user.id, data);
  if (!contact) throw new NotFoundError("Contact not found");

  return NextResponse.json({ contact });
});

export const DELETE = withErrorHandler(async (_req, { params }) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const contact = await contactRepository.delete(params.id, session.user.id);
  if (!contact) throw new NotFoundError("Contact not found");

  return NextResponse.json({ message: "Contact deleted" });
});