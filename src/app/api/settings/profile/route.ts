import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withErrorHandler, UnauthorizedError } from "@/lib/api-utils";
import { profileSchema } from "@/lib/validations/settings";

export const PATCH = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = profileSchema.parse(body);

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: data.name },
  });

  return NextResponse.json({ user: { name: user.name } });
});