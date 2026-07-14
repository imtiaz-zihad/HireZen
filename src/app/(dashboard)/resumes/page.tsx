import { auth } from "@/lib/auth";
import { resumeRepository } from "@/lib/repositories/resume.repository";
import { ResumeUploader } from "@/components/dashboard/resume-uploader";
import { ResumeCard } from "@/components/dashboard/resume-card";

export default async function ResumesPage() {
  const session = await auth();
  const resumes = await resumeRepository.findAllByUser(session!.user.id);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Resumes</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Upload the resumes you use to apply. Mark one as default so it&apos;s ready
          for AI matching against new jobs.
        </p>
      </div>

      <div className="mb-8">
        <ResumeUploader />
      </div>

      {resumes.length === 0 ? (
        <p className="py-8 text-center text-sm text-foreground/50">
          No resumes uploaded yet.
        </p>
      ) : (
        <div className="space-y-3">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}