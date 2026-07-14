"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Resume = {
  id: string;
  name: string;
  fileUrl: string;
  isDefault: boolean;
  createdAt: Date;
};

export function ResumeCard({ resume }: { resume: Resume }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSetDefault() {
    setIsLoading(true);
    await fetch(`/api/resumes/${resume.id}`, { method: "PATCH" });
    setIsLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setIsLoading(true);
    await fetch(`/api/resumes/${resume.id}`, { method: "DELETE" });
    setIsLoading(false);
    setIsDeleteOpen(false);
    router.refresh();
  }

  return (
    <>
      <div className="card-base flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 shrink-0 text-brand-indigo" strokeWidth={1.5} />
          <div>
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              {resume.name}
            </a>
            <p className="text-xs text-foreground/50">
              Uploaded {new Date(resume.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {resume.isDefault ? (
            <span className="flex items-center gap-1 rounded-full bg-brand-indigo/15 px-3 py-1 text-xs font-medium text-brand-indigo">
              <Star className="h-3 w-3 fill-brand-indigo" /> Default
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSetDefault}
              disabled={isLoading}
            >
              Set as default
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this resume?</DialogTitle>
            <DialogDescription>
              This can&apos;t be undone. Any jobs using this resume will keep their
              record, but the file itself will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}