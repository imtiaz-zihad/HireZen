import Link from "next/link";
import { LayoutGrid, Sparkles, CalendarCheck, Landmark } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const pipeline = [
  { label: "Saved", color: "#4b5563", width: "16%" },
  { label: "Applied", color: "#6366f1", width: "24%" },
  { label: "Assessment", color: "#7c6df2", width: "20%" },
  { label: "Interview", color: "#8b5cf6", width: "24%" },
  { label: "Offer", color: "#f5a623", width: "16%" },
];

const stack = [
  {
    company: "Fintra",
    role: "Backend Engineer",
    status: "Offer",
    color: "#f5a623",
    rotate: "rotate-[6deg]",
    translate: "translate-x-8 translate-y-6",
  },
  {
    company: "Northwind Labs",
    role: "Frontend Developer",
    status: "Applied",
    color: "#6366f1",
    rotate: "rotate-[-4deg]",
    translate: "-translate-x-6 translate-y-2",
  },
  {
    company: "Nimbus Tech",
    role: "SWE Intern",
    status: "Interview",
    color: "#8b5cf6",
    rotate: "rotate-[1deg]",
    translate: "translate-y-0",
  },
];

const features = [
  {
    icon: LayoutGrid,
    title: "One board, every application",
    description:
      "Company, role, salary, deadline, notes. The spreadsheet you've been meaning to clean up, replaced.",
  },
  {
    icon: Sparkles,
    title: "Know your odds before you apply",
    description:
      "Claude reads your resume against the real job description and shows a match score plus what's missing.",
  },
  {
    icon: CalendarCheck,
    title: "Interviews, contacts, feedback",
    description:
      "Every interview stays tied to its job and its people, so you walk in remembering what you said last time.",
  },
  {
    icon: Landmark,
    title: "Priced for where you are",
    description:
      "SSLCommerz for taka, Stripe for everyone else. Pay in the currency your search actually runs on.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-20 px-6 pb-24 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-brand-indigo">
              Job search, organized
            </p>
            <h1 className="font-heading text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl">
              You didn&apos;t get ghosted.
              <br />
              You just{" "}
              <span className="relative inline-block">
                lost track.
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-brand-indigo/30" />
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-foreground/60">
              HireZen keeps every application, every stage, and every next step in one
              dashboard — so nothing quietly disappears into fifteen browser tabs.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button className="btn-primary h-12 w-full px-8 text-base sm:w-auto">
                  Start tracking, free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 w-full px-8 text-base sm:w-auto">
                  Log in
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-sm text-foreground/40">
              Free forever for 10 jobs. No card required.
            </p>
          </div>

          {/* Fanned application card stack */}
          <div className="relative mx-auto h-[320px] w-full max-w-sm lg:mx-0">
            <div className="absolute inset-0 -z-10 translate-y-8 bg-brand-purple/10 blur-3xl" />
            {stack.map((job) => (
              <div
                key={job.company}
                className={`card-base absolute inset-x-4 top-6 border-white/5 bg-card shadow-2xl shadow-black/50 transition-transform hover:-translate-y-2 ${job.rotate} ${job.translate}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{job.company}</p>
                    <p className="text-xs text-foreground/50">{job.role}</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: job.color }}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="mt-5 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ backgroundColor: job.color, width: "70%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline signature strip */}
        <section className="border-y border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Every application has a place
            </h2>
            <p className="mt-2 max-w-lg text-foreground/60">
              These are the five stages your dashboard is actually built around — the same
              ones a job moves through from the day you save it to the day you get the offer.
            </p>

            <div className="mt-9 flex h-3 w-full overflow-hidden rounded-full">
              {pipeline.map((stage) => (
                <div
                  key={stage.label}
                  style={{ backgroundColor: stage.color, width: stage.width }}
                />
              ))}
            </div>
            <div className="mt-3 flex w-full text-xs font-medium text-foreground/60">
              {pipeline.map((stage) => (
                <div key={stage.label} style={{ width: stage.width }}>
                  {stage.label}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-foreground/40">
              A job can move to Rejected or Withdrawn from any stage — HireZen tracks those
              too, they just don&apos;t need their own segment in this picture.
            </p>
          </div>
        </section>

        {/* Features — editorial rows, not a card grid */}
        <section id="features" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Built to close gaps, not just log rows
          </h2>

          <div className="mt-4 divide-y divide-border">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8"
              >
                <feature.icon
                  className="h-6 w-6 shrink-0 text-brand-indigo"
                  strokeWidth={1.75}
                />
                <div>
                  <h3 className="font-heading text-lg font-bold">{feature.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm text-foreground/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing — comparison list, not side-by-side cards */}
        <section id="pricing" className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
              Simple pricing
            </h2>
            <p className="mt-3 text-center text-foreground/60">
              Start free. Upgrade only when you&apos;re applying enough to need it.
            </p>

            <div className="mt-12 divide-y divide-border rounded-2xl border border-border">
              <div className="grid grid-cols-3 items-center gap-4 p-6">
                <div>
                  <p className="font-heading text-lg font-bold">Free</p>
                  <p className="text-sm text-foreground/50">Get started</p>
                </div>
                <p className="text-center text-sm text-foreground/70">
                  10 jobs &middot; 3 AI scans / mo
                </p>
                <p className="text-right font-heading text-2xl font-bold">৳0</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 bg-brand-indigo/5 p-6">
                <div>
                  <p className="font-heading text-lg font-bold text-brand-indigo">Pro</p>
                  <p className="text-sm text-foreground/50">For active searches</p>
                </div>
                <p className="text-center text-sm text-foreground/70">
                  Unlimited jobs &middot; Unlimited scans
                </p>
                <p className="text-right font-heading text-2xl font-bold">
                  ৳499<span className="text-sm font-normal text-foreground/50">/mo</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/register">
                <Button className="btn-primary h-12 px-8 text-base">
                  Start tracking, free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}