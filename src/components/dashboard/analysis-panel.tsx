"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

type Analysis = {
  id: string;
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
  createdAt: string | Date;
};

function scoreColor(score: number) {
  if (score >= 75) return "#f5b841";
  if (score >= 50) return "#e8752b";
  return "#ef4444";
}

export function AnalysisPanel({
  jobId,
  initialAnalysis,
  hasResume,
}: {
  jobId: string;
  initialAnalysis: Analysis | null;
  hasResume: boolean;
}) {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(initialAnalysis);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis() {
    setIsLoading(true);
    setError(null);

    const res = await fetch(`/api/jobs/${jobId}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const body = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      setError(body.error || "Analysis failed. Please try again.");
      return;
    }

    setAnalysis(body.analysis);
    router.refresh();
  }

  if (!hasResume) {
    return (
      <div className="card-base">
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Sparkles className="h-4 w-4 text-brand-indigo" />
          Upload a resume first to get an AI match score for this job.
        </div>
      </div>
    );
  }

  return (
    <div className="card-base">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Sparkles className="h-5 w-5 text-brand-indigo" />
          AI Match Analysis
        </h2>
        <Button
          onClick={runAnalysis}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? "Analyzing..." : analysis ? "Re-analyze" : "Analyze with AI"}
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {!analysis && !error && !isLoading && (
        <p className="py-6 text-center text-sm text-foreground/50">
          Run an analysis to see how your default resume matches this job.
        </p>
      )}

      {isLoading && (
        <p className="py-6 text-center text-sm text-foreground/50">
          Reading your resume against this job description...
        </p>
      )}

      {analysis && !isLoading && (
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-foreground/60">Match score</span>
              <span
                className="font-heading text-2xl font-bold"
                style={{ color: scoreColor(analysis.matchScore) }}
              >
                {analysis.matchScore}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${analysis.matchScore}%`,
                  backgroundColor: scoreColor(analysis.matchScore),
                }}
              />
            </div>
          </div>

          {analysis.strengths.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-brand-indigo" />
                Strengths
              </h3>
              <ul className="space-y-1.5 pl-6 text-sm text-foreground/70">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="list-disc">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.missingSkills.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                <AlertCircle className="h-4 w-4 text-red-400" />
                Gaps to address
              </h3>
              <ul className="space-y-1.5 pl-6 text-sm text-foreground/70">
                {analysis.missingSkills.map((s, i) => (
                  <li key={i} className="list-disc">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="h-4 w-4 text-[#f5a623]" />
                Suggestions
              </h3>
              <ul className="space-y-1.5 pl-6 text-sm text-foreground/70">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="list-disc">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-foreground/40">
            Analyzed {new Date(analysis.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}