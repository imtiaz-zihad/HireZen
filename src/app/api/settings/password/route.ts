import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withErrorHandler, UnauthorizedError } from "@/lib/api-utils";
import { passwordSchema } from "@/lib/validations/settings";

export const PATCH = withErrorHandler(async (req) => {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  const body = await req.json();
  const data = passwordSchema.parse(body);

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (!user?.password) {
    return NextResponse.json(
      { error: "You signed in with Google. There's no password to change." },
      { status: 400 }
    );
  }

  const isValid = await bcrypt.compare(data.currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 12);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Password updated successfully" });
});