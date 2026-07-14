"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

export function ResumeUploader() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <UploadDropzone
        endpoint="resumeUploader"
        onClientUploadComplete={() => {
          setError(null);
          router.refresh();
        }}
        onUploadError={(err) => {
          setError(err.message);
        }}
        appearance={{
          container:
            "border-2 border-dashed border-border rounded-xl bg-muted/40 py-8",
          label: "text-foreground/70 text-sm",
          allowedContent: "text-foreground/40 text-xs",
          button:
            "bg-brand-indigo hover:bg-brand-purple text-white font-medium rounded-xl px-4 py-2 text-sm",
        }}
      />
      {error && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}