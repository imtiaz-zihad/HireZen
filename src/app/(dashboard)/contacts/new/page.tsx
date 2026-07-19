import { ContactForm } from "@/components/dashboard/contact-form";

export default function NewContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Add a contact</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Recruiters, referrals, hiring managers — anyone worth keeping track of.
        </p>
      </div>

      <div className="card-base">
        <ContactForm />
      </div>
    </div>
  );
}