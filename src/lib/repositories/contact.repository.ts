import { prisma } from "@/lib/prisma";
import type { ContactInput } from "@/lib/validations/contact";

export const contactRepository = {
  async findAllByUser(userId: string) {
    return prisma.contact.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.contact.findFirst({ where: { id, userId } });
  },

  async create(userId: string, data: ContactInput) {
    return prisma.contact.create({
      data: {
        userId,
        name: data.name,
        company: data.company || null,
        position: data.position || null,
        email: data.email || null,
        linkedin: data.linkedin || null,
        notes: data.notes || null,
        lastContact: data.lastContact ? new Date(data.lastContact) : null,
      },
    });
  },

  async update(id: string, userId: string, data: ContactInput) {
    const existing = await prisma.contact.findFirst({ where: { id, userId } });
    if (!existing) return null;

    return prisma.contact.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company || null,
        position: data.position || null,
        email: data.email || null,
        linkedin: data.linkedin || null,
        notes: data.notes || null,
        lastContact: data.lastContact ? new Date(data.lastContact) : null,
      },
    });
  },

  async delete(id: string, userId: string) {
    const existing = await prisma.contact.findFirst({ where: { id, userId } });
    if (!existing) return null;

    return prisma.contact.delete({ where: { id } });
  },
};