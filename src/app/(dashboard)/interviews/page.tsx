import Link from "next/link";
import { auth } from "@/lib/auth";
import { interviewRepository } from "@/lib/repositories/interview.repository";
import { INTERVIEW_TYPE_LABELS } from "@/lib/interview-type";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function InterviewsPage() {
  const session = await auth();
  const interviews = await interviewRepository.findAllByUser(session!.user.id);

  const now = new Date();
  const upcoming = interviews.filter((i) => new Date(i.scheduledAt) >= now);
  const past = interviews.filter((i) => new Date(i.scheduledAt) < now).reverse();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Interviews</h1>
        <Link href="/interviews/new">
          <Button className="btn-primary">Schedule interview</Button>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 font-heading text-lg font-bold">Upcoming</h2>
        <div className="card-base">
          {upcoming.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              No upcoming interviews scheduled.
            </p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((interview) => (
                <Link
                  key={interview.id}
                  href={`/interviews/${interview.id}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-muted/60 px-4 py-3 hover:border-brand-indigo/40"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {interview.job.company} — {interview.job.role}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {new Date(interview.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge className="bg-brand-indigo text-white">
                    {INTERVIEW_TYPE_LABELS[interview.type]}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-heading text-lg font-bold">Past</h2>
        <div className="card-base">
          {past.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              No past interviews yet.
            </p>
          ) : (
            <div className="space-y-3">
              {past.map((interview) => (
                <Link
                  key={interview.id}
                  href={`/interviews/${interview.id}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 hover:border-brand-indigo/40"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {interview.job.company} — {interview.job.role}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {new Date(interview.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs text-foreground/50">
                    {interview.result || "No result logged"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}