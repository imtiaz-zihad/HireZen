import { prisma } from "@/lib/prisma";

export const analyticsRepository = {
  async getOverview(userId: string) {
    const [statusCounts, jobs, analyses] = await Promise.all([
      prisma.job.groupBy({
        by: ["status"],
        where: { userId },
        _count: true,
      }),
      prisma.job.findMany({
        where: { userId },
        select: { createdAt: true, status: true, appliedAt: true },
      }),
      prisma.aiAnalysis.findMany({
        where: { job: { userId } },
        select: { matchScore: true },
      }),
    ]);

    const totalJobs = jobs.length;
    const appliedCount = jobs.filter((j) => j.appliedAt !== null).length;
    const offerCount = jobs.filter((j) => j.status === "OFFER").length;
    const offerRate = appliedCount > 0 ? (offerCount / appliedCount) * 100 : 0;

    const avgMatchScore =
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + a.matchScore, 0) / analyses.length
          )
        : null;

    const monthBuckets: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short" });
      monthBuckets[key] = 0;
    }
    jobs.forEach((job) => {
      const key = new Date(job.createdAt).toLocaleDateString("en-US", {
        month: "short",
      });
      if (key in monthBuckets) monthBuckets[key]++;
    });
    const applicationsOverTime = Object.entries(monthBuckets).map(
      ([month, count]) => ({ month, count })
    );

    return {
      statusCounts,
      totalJobs,
      appliedCount,
      offerCount,
      offerRate,
      avgMatchScore,
      analysisCount: analyses.length,
      applicationsOverTime,
    };
  },
};