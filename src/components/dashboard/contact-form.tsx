"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";

type ContactFormProps = {
  contactId?: string;
  defaultValues?: Partial<ContactInput>;
};

export function ContactForm({ contactId, defaultValues }: ContactFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isEditing = Boolean(contactId);

  const { control, handleSubmit } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      email: "",
      linkedin: "",
      notes: "",
      lastContact: "",
      ...defaultValues,
    },
  });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    setIsSubmitting(true);

    const res = await fetch(
      isEditing ? `/api/contacts/${contactId}` : "/api/contacts",
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

    router.push("/contacts");
    router.refresh();
  }

  async function handleDelete() {
    if (!contactId) return;
    setIsDeleting(true);
    await fetch(`/api/contacts/${contactId}`, { method: "DELETE" });
    setIsDeleting(false);
    setDeleteOpen(false);
    router.push("/contacts");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" placeholder="Sarah Ahmed" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="company"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company">Company</FieldLabel>
                  <Input id="company" placeholder="Nimbus Tech" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="position"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="position">Their role</FieldLabel>
                  <Input id="position" placeholder="Engineering Recruiter" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="sarah@nimbus.com" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="linkedin"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="lastContact"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastContact">Last contacted</FieldLabel>
                  <Input id="lastContact" type="date" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="How you met, what you talked about, follow-up ideas..."
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {serverError && (
            <p className="text-sm text-red-400" role="alert">
              {serverError}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Add contact"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>

            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            )}
          </div>
        </FieldGroup>
      </form>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this contact?</DialogTitle>
            <DialogDescription>
              This removes them from your contacts permanently. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}