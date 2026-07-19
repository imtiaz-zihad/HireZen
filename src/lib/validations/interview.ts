import { z } from "zod";

export const interviewTypeEnum = z.enum([
  "PHONE_SCREEN",
  "TECHNICAL",
  "BEHAVIORAL",
  "SYSTEM_DESIGN",
  "HR",
  "FINAL",
  "OTHER",
]);

export const interviewSchema = z.object({
  jobId: z.string().min(1, "Select a job"),
  type: interviewTypeEnum,
  scheduledAt: z.string().min(1, "Pick a date and time"),
  meetingLink: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
  feedback: z.string().max(2000).optional().or(z.literal("")),
  result: z.string().max(60).optional().or(z.literal("")),
});

export type InterviewInput = z.infer<typeof interviewSchema>;