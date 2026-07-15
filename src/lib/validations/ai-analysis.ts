import { z } from "zod";

export const aiAnalysisResultSchema = z.object({
  matchScore: z.number().min(0).max(100),
  strengths: z.array(z.string()).max(5),
  missingSkills: z.array(z.string()).max(5),
  suggestions: z.array(z.string()).max(5),
});

export type AiAnalysisResult = z.infer<typeof aiAnalysisResultSchema>;