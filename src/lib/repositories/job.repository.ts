import { prisma } from "@/lib/prisma";
import type { JobStatus } from "@prisma/client";
import type { JobInput } from "@/lib/validations/job";

export const jobRepository = {
  async findAllByUser(userId: string, status?: JobStatus) {
    return prisma.job.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: { updatedAt: "desc" },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.job.findFirst({ where: { id, userId } });
  },

  async count(userId: string) {
    return prisma.job.count({ where: { userId } });
  },

  async create(userId: string, data: JobInput) {
    return prisma.job.create({
      data: {
        userId,
        company: data.company,
        role: data.role,
        location: data.location || null,
        salary: data.salary || null,
        jobUrl: data.jobUrl || null,
        status: data.status,
        notes: data.notes || null,
        deadlineAt: data.deadlineAt ? new Date(data.deadlineAt) : null,
        appliedAt: data.status !== "SAVED" ? new Date() : null,
        timeline: {
          create: { status: data.status, note: "Job added" },
        },
      },
    });
  },

  async update(id: string, userId: string, data: JobInput) {
    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return null;

    const statusChanged = existing.status !== data.status;

    return prisma.job.update({
      where: { id },
      data: {
        company: data.company,
        role: data.role,
        location: data.location || null,
        salary: data.salary || null,
        jobUrl: data.jobUrl || null,
        status: data.status,
        notes: data.notes || null,
        deadlineAt: data.deadlineAt ? new Date(data.deadlineAt) : null,
        ...(statusChanged && {
          timeline: {
            create: { status: data.status, note: "Status updated" },
          },
        }),
      },
    });
  },

  async delete(id: string, userId: string) {
    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return null;

    return prisma.job.delete({ where: { id } });
  },
};