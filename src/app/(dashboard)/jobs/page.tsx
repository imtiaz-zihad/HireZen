import Link from "next/link";
import { auth } from "@/lib/auth";
import { jobRepository } from "@/lib/repositories/job.repository";
import { JOB_STATUSES, STATUS_COLORS, STATUS_LABELS } from "@/lib/job-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@prisma/client";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const session = await auth();

  const activeStatus =
    status && JOB_STATUSES.includes(status as JobStatus)
      ? (status as JobStatus)
      : undefined;

  const jobs = await jobRepository.findAllByUser(session!.user.id, activeStatus);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Jobs</h1>
        <Link href="/jobs/new">
          <Button className="btn-primary">Add a job</Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/jobs"
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium",
            !activeStatus
              ? "bg-brand-indigo text-white"
              : "bg-muted text-foreground/60 hover:text-foreground"
          )}
        >
          All
        </Link>
        {JOB_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/jobs?status=${s}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium",
              activeStatus === s
                ? "text-white"
                : "bg-muted text-foreground/60 hover:text-foreground"
            )}
            style={activeStatus === s ? { backgroundColor: STATUS_COLORS[s] } : undefined}
          >
            {STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="card-base">
        {jobs.length === 0 ? (
          <p className="py-12 text-center text-sm text-foreground/50">
            {activeStatus
              ? `No jobs with status "${STATUS_LABELS[activeStatus]}".`
              : "No jobs yet. Add your first application to get started."}
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/60 px-4 py-3 hover:border-brand-indigo/40"
              >
                <div>
                  <p className="text-sm font-medium">{job.company}</p>
                  <p className="text-xs text-foreground/50">
                    {job.role}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>
                <Badge
                  style={{ backgroundColor: STATUS_COLORS[job.status] }}
                  className="text-white"
                >
                  {STATUS_LABELS[job.status]}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}