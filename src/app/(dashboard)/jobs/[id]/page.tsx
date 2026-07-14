import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { jobRepository } from "@/lib/repositories/job.repository";
import { JobForm } from "@/components/dashboard/job-form";
import { DeleteJobButton } from "@/components/dashboard/delete-job-button";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const job = await jobRepository.findById(id, session!.user.id);
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            {job.company} — {job.role}
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            Added {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
        <DeleteJobButton jobId={job.id} />
      </div>

      <div className="card-base">
        <JobForm
          jobId={job.id}
          defaultValues={{
            company: job.company,
            role: job.role,
            location: job.location ?? "",
            salary: job.salary ?? "",
            jobUrl: job.jobUrl ?? "",
            status: job.status,
            notes: job.notes ?? "",
            deadlineAt: job.deadlineAt
              ? new Date(job.deadlineAt).toISOString().split("T")[0]
              : "",
          }}
        />
      </div>
    </div>
  );
}