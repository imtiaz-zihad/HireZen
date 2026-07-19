import { prisma } from "@/lib/prisma";
import type { InterviewInput } from "@/lib/validations/interview";

const PIPELINE_ORDER = ["SAVED", "APPLIED", "ASSESSMENT", "INTERVIEW", "OFFER"];

export const interviewRepository = {
  async findAllByUser(userId: string) {
    return prisma.interview.findMany({
      where: { userId },
      include: { job: true },
      orderBy: { scheduledAt: "asc" },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.interview.findFirst({
      where: { id, userId },
      include: { job: true },
    });
  },

  async create(userId: string, data: InterviewInput) {
    const job = await prisma.job.findFirst({ where: { id: data.jobId, userId } });
    if (!job) return null;

    const interview = await prisma.interview.create({
      data: {
        userId,
        jobId: data.jobId,
        type: data.type,
        scheduledAt: new Date(data.scheduledAt),
        meetingLink: data.meetingLink || null,
        notes: data.notes || null,
        feedback: data.feedback || null,
        result: data.result || null,
      },
    });

    const jobIdx = PIPELINE_ORDER.indexOf(job.status);
    const interviewIdx = PIPELINE_ORDER.indexOf("INTERVIEW");
    if (jobIdx !== -1 && jobIdx < interviewIdx) {
      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: "INTERVIEW",
          timeline: { create: { status: "INTERVIEW", note: "Interview scheduled" } },
        },
      });
    }

    return interview;
  },

  async update(id: string, userId: string, data: InterviewInput) {
    const existing = await prisma.interview.findFirst({ where: { id, userId } });
    if (!existing) return null;

    return prisma.interview.update({
      where: { id },
      data: {
        jobId: data.jobId,
        type: data.type,
        scheduledAt: new Date(data.scheduledAt),
        meetingLink: data.meetingLink || null,
        notes: data.notes || null,
        feedback: data.feedback || null,
        result: data.result || null,
      },
    });
  },

  async delete(id: string, userId: string) {
    const existing = await prisma.interview.findFirst({ where: { id, userId } });
    if (!existing) return null;

    return prisma.interview.delete({ where: { id } });
  },
};