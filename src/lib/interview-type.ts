import type { InterviewType } from "@prisma/client";

export const INTERVIEW_TYPES: InterviewType[] = [
  "PHONE_SCREEN",
  "TECHNICAL",
  "BEHAVIORAL",
  "SYSTEM_DESIGN",
  "HR",
  "FINAL",
  "OTHER",
];

export const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  PHONE_SCREEN: "Phone Screen",
  TECHNICAL: "Technical",
  BEHAVIORAL: "Behavioral",
  SYSTEM_DESIGN: "System Design",
  HR: "HR",
  FINAL: "Final",
  OTHER: "Other",
};