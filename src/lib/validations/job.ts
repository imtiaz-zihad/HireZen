import { z } from "zod";

export const jobStatusEnum = z.enum([
  "SAVED",
  "APPLIED",
  "ASSESSMENT",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
]);

export const jobSchema = z.object({
  company: z.string().min(1, "Company is required").max(120),
  role: z.string().min(1, "Role is required").max(120),
  location: z.string().max(120).optional().or(z.literal("")),
  salary: z.string().max(60).optional().or(z.literal("")),
  jobUrl: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  status: jobStatusEnum,
  notes: z.string().max(2000).optional().or(z.literal("")),
  deadlineAt: z.string().optional().or(z.literal("")),
});

export type JobInput = z.infer<typeof jobSchema>;