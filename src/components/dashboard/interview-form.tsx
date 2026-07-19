"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { interviewSchema, type InterviewInput } from "@/lib/validations/interview";
import { INTERVIEW_TYPES, INTERVIEW_TYPE_LABELS } from "@/lib/interview-type";

type JobOption = { id: string; company: string; role: string };

type InterviewFormProps = {
  interviewId?: string;
  defaultValues?: Partial<InterviewInput>;
  jobs: JobOption[];
  lockJobId?: string;
};

export function InterviewForm({
  interviewId,
  defaultValues,
  jobs,
  lockJobId,
}: InterviewFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(interviewId);

  const { control, handleSubmit } = useForm<InterviewInput>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobId: lockJobId || "",
      type: "PHONE_SCREEN",
      scheduledAt: "",
      meetingLink: "",
      notes: "",
      feedback: "",
      result: "",
      ...defaultValues,
    },
  });

  async function onSubmit(data: InterviewInput) {
    setServerError(null);
    setIsSubmitting(true);

    const res = await fetch(
      isEditing ? `/api/interviews/${interviewId}` : "/api/interviews",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const body = await res.json();
    setIsSubmitting(false);

    if (!res.ok) {
      setServerError(body.error || "Something went wrong");
      return;
    }

    router.push(`/interviews/${body.interview.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="jobId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="jobId">Job</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={Boolean(lockJobId)}
              >
                <SelectTrigger id="jobId">
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.company} — {job.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="type">Interview type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {INTERVIEW_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="scheduledAt"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="scheduledAt">Date &amp; time</FieldLabel>
                <Input id="scheduledAt" type="datetime-local" {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="meetingLink"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="meetingLink">Meeting link</FieldLabel>
              <Input id="meetingLink" placeholder="https://meet.google.com/..." {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="notes">Prep notes</FieldLabel>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Topics to review, questions to ask..."
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {isEditing && (
          <>
            <Controller
              name="feedback"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="feedback">Feedback / how it went</FieldLabel>
                  <Textarea id="feedback" rows={3} {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="result"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="result">Result</FieldLabel>
                  <Input id="result" placeholder="Passed, Pending, Rejected..." {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </>
        )}

        {serverError && (
          <p className="text-sm text-red-400" role="alert">
            {serverError}
          </p>
        )}

        <div className="flex gap-3">
          <Button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Schedule interview"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}