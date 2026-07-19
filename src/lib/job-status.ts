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
  SAVED: "#6b7280",
  APPLIED: "#e8752b",
  ASSESSMENT: "#d9832f",
  INTERVIEW: "#c65a1e",
  OFFER: "#f5b841",
  REJECTED: "#ef4444",
  WITHDRAWN: "#78716c",
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