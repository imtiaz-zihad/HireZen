import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { ContactForm } from "@/components/dashboard/contact-form";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const contact = await contactRepository.findById(id, session!.user.id);
  if (!contact) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">{contact.name}</h1>
      </div>

      <div className="card-base">
        <ContactForm
          contactId={contact.id}
          defaultValues={{
            name: contact.name,
            company: contact.company ?? "",
            position: contact.position ?? "",
            email: contact.email ?? "",
            linkedin: contact.linkedin ?? "",
            notes: contact.notes ?? "",
            lastContact: contact.lastContact
              ? new Date(contact.lastContact).toISOString().split("T")[0]
              : "",
          }}
        />
      </div>
    </div>
  );
}