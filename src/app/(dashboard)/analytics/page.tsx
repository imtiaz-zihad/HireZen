import { auth } from "@/lib/auth";
import { analyticsRepository } from "@/lib/repositories/analytics.repository";
import { StatusBarChart, ApplicationsLineChart } from "@/components/dashboard/analytics-charts";

export default async function AnalyticsPage() {
  const session = await auth();
  const data = await analyticsRepository.getOverview(session!.user.id);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-foreground/60">
          How your job search is actually going.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card-base">
          <p className="text-xs text-foreground/50">Total applications</p>
          <p className="mt-2 font-heading text-2xl font-bold">{data.totalJobs}</p>
        </div>
        <div className="card-base">
          <p className="text-xs text-foreground/50">Actually applied</p>
          <p className="mt-2 font-heading text-2xl font-bold">{data.appliedCount}</p>
        </div>
        <div className="card-base">
          <p className="text-xs text-foreground/50">Offer rate</p>
          <p className="mt-2 font-heading text-2xl font-bold">
            {data.offerRate.toFixed(0)}%
          </p>
        </div>
        <div className="card-base">
          <p className="text-xs text-foreground/50">Avg. AI match score</p>
          <p className="mt-2 font-heading text-2xl font-bold">
            {data.avgMatchScore !== null ? `${data.avgMatchScore}%` : "—"}
          </p>
        </div>
      </div>

      <div className="mb-6 card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">By status</h2>
        {data.totalJobs === 0 ? (
          <p className="py-12 text-center text-sm text-foreground/50">
            Add some jobs to see your pipeline breakdown.
          </p>
        ) : (
          <StatusBarChart data={data.statusCounts} />
        )}
      </div>

      <div className="card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">Applications over time</h2>
        <ApplicationsLineChart data={data.applicationsOverTime} />
      </div>
    </div>
  );
}