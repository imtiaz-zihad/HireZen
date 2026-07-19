import Link from "next/link";
import { auth } from "@/lib/auth";
import { contactRepository } from "@/lib/repositories/contact.repository";
import { Button } from "@/components/ui/button";
import { User2, Mail, Building2 } from "lucide-react";

export default async function ContactsPage() {
  const session = await auth();
  const contacts = await contactRepository.findAllByUser(session!.user.id);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Contacts</h1>
        <Link href="/contacts/new">
          <Button className="btn-primary">Add contact</Button>
        </Link>
      </div>

      <div className="card-base">
        {contacts.length === 0 ? (
          <p className="py-12 text-center text-sm text-foreground/50">
            No contacts yet. Add recruiters, referrals, or people you meet during your search.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {contacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/contacts/${contact.id}`}
                className="rounded-xl border border-border bg-muted/60 p-4 hover:border-brand-indigo/40"
              >
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-brand-indigo" strokeWidth={1.75} />
                  <p className="text-sm font-medium">{contact.name}</p>
                </div>
                {(contact.position || contact.company) && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/60">
                    <Building2 className="h-3 w-3" />
                    {[contact.position, contact.company].filter(Boolean).join(" · ")}
                  </p>
                )}
                {contact.email && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/50">
                    <Mail className="h-3 w-3" />
                    {contact.email}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}