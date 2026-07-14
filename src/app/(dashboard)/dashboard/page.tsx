import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const statusColors: Record<string, string> = {
  SAVED: "var(--color-stamp-graphite)",
  APPLIED: "var(--color-stamp-ledger)",
  ASSESSMENT: "var(--color-stamp-olive)",
  INTERVIEW: "var(--color-stamp-violet)",
  OFFER: "var(--color-stamp-red)",
  REJECTED: "var(--color-stamp-void)",
  WITHDRAWN: "var(--color-stamp-slate)",
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [jobs, jobCounts, subscription] = await Promise.all([
    prisma.job.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.job.groupBy({
      by: ["status"],
      where: { userId },
      _count: true,
    }),
    prisma.subscription.findUnique({ where: { userId } }),
  ]);

  const totalJobs = jobCounts.reduce((sum, c) => sum + c._count, 0);
  const isPro = subscription?.plan === "PRO" || subscription?.plan === "PREMIUM";
  const jobLimit = isPro ? null : 10;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            {totalJobs} {totalJobs === 1 ? "job" : "jobs"} tracked
            {jobLimit ? ` · ${jobLimit - totalJobs} remaining on Free plan` : ""}
          </p>
        </div>
        <Link href="/jobs/new" className="btn-primary">
          Add a job
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(statusColors).map(([status, color]) => {
          const count = jobCounts.find((c) => c.status === status)?._count ?? 0;
          return (
            <div key={status} className="card-base">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-card-foreground/60">{status}</p>
              </div>
              <p className="mt-2 font-heading text-2xl font-bold">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">Recently updated</h2>
        {jobs.length === 0 ? (
          <p className="py-8 text-center text-sm text-card-foreground/50">
            No jobs yet. Add your first application to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="flex items-center justify-between rounded-xl border border-border/30 bg-black/[0.04] px-4 py-3 hover:border-stamp-red/40"
              >
                <div>
                  <p className="text-sm font-medium text-card-foreground">{job.company}</p>
                  <p className="text-xs text-card-foreground/60">{job.role}</p>
                </div>
                <Badge
                  style={{ backgroundColor: statusColors[job.status] }}
                  className="text-white"
                >
                  {job.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}