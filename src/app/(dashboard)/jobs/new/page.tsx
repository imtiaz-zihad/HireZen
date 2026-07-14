import { JobForm } from "@/components/dashboard/job-form";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Add a job</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Track a new application from the start.
        </p>
      </div>

      <div className="card-base">
        <JobForm />
      </div>
    </div>
  );
}