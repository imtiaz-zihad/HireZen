import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InterviewForm } from "@/components/dashboard/interview-form";

export default async function NewInterviewPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { jobId } = await searchParams;
  const session = await auth();

  const jobs = await prisma.job.findMany({
    where: { userId: session!.user.id },
    select: { id: true, company: true, role: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Schedule an interview</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Keep prep notes and feedback tied to the right job.
        </p>
      </div>

      <div className="card-base">
        {jobs.length === 0 ? (
          <p className="py-8 text-center text-sm text-foreground/50">
            Add a job first before scheduling an interview for it.
          </p>
        ) : (
          <InterviewForm jobs={jobs} lockJobId={jobId} />
        )}
      </div>
    </div>
  );
}