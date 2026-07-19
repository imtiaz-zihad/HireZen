import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  company: z.string().max(120).optional().or(z.literal("")),
  position: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
  lastContact: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;