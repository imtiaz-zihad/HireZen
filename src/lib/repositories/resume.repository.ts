import { prisma } from "@/lib/prisma";

export const resumeRepository = {
  async findAllByUser(userId: string) {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.resume.findFirst({ where: { id, userId } });
  },

  async setDefault(id: string, userId: string) {
    const resume = await prisma.resume.findFirst({ where: { id, userId } });
    if (!resume) return null;

    await prisma.$transaction([
      prisma.resume.updateMany({
        where: { userId },
        data: { isDefault: false },
      }),
      prisma.resume.update({
        where: { id },
        data: { isDefault: true },
      }),
    ]);

    return resume;
  },

  async delete(id: string, userId: string) {
    const resume = await prisma.resume.findFirst({ where: { id, userId } });
    if (!resume) return null;

    return prisma.resume.delete({ where: { id } });
  },
};