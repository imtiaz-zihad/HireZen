import type { JobStatus } from "@prisma/client";

export const JOB_STATUSES: JobStatus[] = [
  "SAVED",
  "APPLIED",
  "ASSESSMENT",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
];

export const STATUS_COLORS: Record<JobStatus, string> = {
  SAVED: "#4b5563",
  APPLIED: "#6366f1",
  ASSESSMENT: "#7c6df2",
  INTERVIEW: "#8b5cf6",
  OFFER: "#f5a623",
  REJECTED: "#ef4444",
  WITHDRAWN: "#6b7280",
};

export const STATUS_LABELS: Record<JobStatus, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  ASSESSMENT: "Assessment",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};