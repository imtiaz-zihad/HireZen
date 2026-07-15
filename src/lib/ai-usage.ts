import { prisma } from "@/lib/prisma";

const FREE_MONTHLY_SCAN_LIMIT = 3;

export async function checkAndIncrementAiUsage(userId: string, type: string) {
  const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  const subscription = await prisma.subscription.findUnique({ where: { userId } });
  const isPro = subscription?.plan === "PRO" || subscription?.plan === "PREMIUM";

  const usage = await prisma.aiUsage.findUnique({
    where: { userId_type_month: { userId, type, month } },
  });

  const currentCount = usage?.count ?? 0;

  if (!isPro && currentCount >= FREE_MONTHLY_SCAN_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.aiUsage.upsert({
    where: { userId_type_month: { userId, type, month } },
    create: { userId, type, month, count: 1 },
    update: { count: { increment: 1 } },
  });

  return {
    allowed: true,
    remaining: isPro ? null : FREE_MONTHLY_SCAN_LIMIT - currentCount - 1,
  };
}