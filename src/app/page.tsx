import Link from "next/link";
import { Fraunces, Space_Mono } from "next/font/google";
import { LayoutGrid, ScanSearch, CalendarCheck, Landmark } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

/**
 * Design notes for whoever picks this up:
 * - Palette and type are self-contained in this file (arbitrary Tailwind values),
 *   deliberately NOT reusing the old --brand-indigo / --brand-purple tokens or
 *   the .btn-primary global class, since those are the old theme. If Navbar/
 *   Footer still use the indigo theme, they'll want a matching pass.
 * - Signature idea: HireZen as a split-flap departure board. Applications are
 *   "flights" with a status; pipeline stages are "gates"; pricing tiers are
 *   boarding passes. One idea, carried consistently, rest of the page stays quiet.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-board",
});

const INK = "#14161c";
const PANEL = "#1c1f27";
const PAPER = "#f0ece2";
const AMBER = "#f2b544";
const TEAL = "#3f7268";
const RUST = "#c0603f";

const board = [
  { code: "FTR·01", company: "Fintra", role: "Backend Engineer", status: "OFFER", color: AMBER },
  { code: "NWD·02", company: "Northwind Labs", role: "Frontend Developer", status: "APPLIED", color: TEAL },
  { code: "NMB·03", company: "Nimbus Tech", role: "SWE Intern", status: "INTERVIEW", color: "#c9c4b6" },
  { code: "STL·04", company: "Stellar Retail", role: "Data Analyst", status: "ASSESSMENT", color: "#8b8d94" },
];

const gates = [
  { gate: "A1", label: "Saved", width: "16%" },
  { gate: "A2", label: "Applied", width: "24%" },
  { gate: "A3", label: "Assessment", width: "20%" },
  { gate: "A4", label: "Interview", width: "24%" },
  { gate: "A5", label: "Offer", width: "16%" },
];

const features = [
  {
    icon: LayoutGrid,
    title: "One board, every application",
    description:
      "Company, role, salary, deadline, notes. The spreadsheet you've been meaning to clean up, replaced.",
  },
  {
    icon: ScanSearch,
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
    <div
      className={`${fraunces.variable} ${spaceMono.variable} flex min-h-screen flex-col overflow-x-hidden`}
      style={{ backgroundColor: PAPER }}
    >
      <Navbar />

      <main className="flex-1">
        {/* Hero — the board itself is the thesis */}
        <section style={{ backgroundColor: INK }} className="relative">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
            <div>
              <p
                className="mb-5 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: AMBER, fontFamily: "var(--font-board)" }}
              >
                Status: unresolved
              </p>
              <h1
                className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
                style={{ color: PAPER, fontFamily: "var(--font-display)" }}
              >
                You didn&apos;t get ghosted.
                <br />
                You just{" "}
                <span className="italic" style={{ color: AMBER }}>
                  lost track.
                </span>
              </h1>
              <p className="mt-7 max-w-md text-lg" style={{ color: "#b7b4a8" }}>
                HireZen keeps every application, every stage, and every next step in
                one board — so nothing quietly disappears into fifteen browser tabs.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/register">
                  <Button
                    className="h-12 w-full rounded-md px-8 text-base font-semibold hover:brightness-105 sm:w-auto"
                    style={{ backgroundColor: AMBER, color: INK }}
                  >
                    Start tracking, free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-md border-[#3a3d47] bg-transparent px-8 text-base hover:bg-[#1c1f27] sm:w-auto"
                    style={{ color: PAPER }}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-sm" style={{ color: "#6f6d63" }}>
                Free forever for 10 jobs. No card required.
              </p>
            </div>

            {/* Split-flap status board */}
            <div
              className="relative overflow-hidden rounded-lg border"
              style={{ backgroundColor: PANEL, borderColor: "#2c2f38" }}
            >
              <div
                className="flex items-center justify-between border-b px-5 py-3"
                style={{ borderColor: "#2c2f38" }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#8b8d94", fontFamily: "var(--font-board)" }}
                >
                  Application Board
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: AMBER, boxShadow: `0 0 8px ${AMBER}` }}
                />
              </div>
              <div className="divide-y" style={{ borderColor: "#2c2f38" }}>
                {board.map((row, i) => (
                  <div
                    key={row.code}
                    className="motion-safe:animate-flap flex items-center justify-between gap-4 px-5 py-4 opacity-0"
                    style={{
                      animationDelay: `${i * 140}ms`,
                      fontFamily: "var(--font-board)",
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="text-xs" style={{ color: "#565a66" }}>
                        {row.code}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm" style={{ color: PAPER }}>
                          {row.company}
                        </p>
                        <p className="truncate text-xs" style={{ color: "#7b7e88" }}>
                          {row.role}
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded px-2.5 py-1 text-[11px] font-bold tracking-wider"
                      style={{ backgroundColor: `${row.color}1a`, color: row.color }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="border-t px-5 py-2.5 text-[11px]"
                style={{ borderColor: "#2c2f38", color: "#565a66", fontFamily: "var(--font-board)" }}
              >
                4 of 4 shown &middot; last updated just now
              </div>
            </div>
          </div>

          <style>{`
            @keyframes flap {
              0% { opacity: 0; transform: translateY(-6px); filter: blur(1px); }
              60% { opacity: 1; }
              100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            .animate-flap { animation: flap 0.5s ease-out forwards; }
            @media (prefers-reduced-motion: reduce) {
              .animate-flap { animation: none; opacity: 1; }
            }
          `}</style>
        </section>

        {/* Gate strip — the pipeline, as signage */}
        <section className="border-b" style={{ borderColor: "#e3ddcd" }}>
          <div className="mx-auto max-w-6xl px-6 py-14">
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: "var(--font-display)", color: INK }}
            >
              Every application has a gate
            </h2>
            <p className="mt-2 max-w-lg" style={{ color: "#5b584d" }}>
              Five stages your board is actually built around — the same ones a job
              moves through from the day you save it to the day you get the offer.
            </p>

            <div className="mt-10 flex w-full">
              {gates.map((g) => (
                <div key={g.gate} style={{ width: g.width }} className="pr-3 last:pr-0">
                  <div
                    className="flex items-baseline justify-between border-t-2 pt-3"
                    style={{ borderColor: g.gate === "A5" ? AMBER : "#d8d2c1" }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ fontFamily: "var(--font-board)", color: g.gate === "A5" ? "#b5822a" : "#9a978c" }}
                    >
                      GATE {g.gate}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium" style={{ color: INK }}>
                    {g.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs" style={{ color: "#9a978c" }}>
              A job can move to Rejected or Withdrawn from any gate — HireZen tracks
              those too, they just don&apos;t need their own slot in this picture.
            </p>
          </div>
        </section>

        {/* Features — quiet, editorial rows */}
        <section id="features" className="mx-auto max-w-4xl px-6 py-20">
          <h2
            className="text-2xl font-semibold sm:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: INK }}
          >
            Built to close gaps, not just log rows
          </h2>

          <div className="mt-4 divide-y" style={{ borderColor: "#e3ddcd" }}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8"
              >
                <feature.icon className="h-6 w-6 shrink-0" style={{ color: TEAL }} strokeWidth={1.75} />
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-display)", color: INK }}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm" style={{ color: "#5b584d" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing — boarding passes, not pricing cards */}
        <section id="pricing" className="border-t py-20" style={{ borderColor: "#e3ddcd" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="text-center text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: "var(--font-display)", color: INK }}
            >
              Simple pricing
            </h2>
            <p className="mt-3 text-center" style={{ color: "#5b584d" }}>
              Start free. Upgrade only when you&apos;re applying enough to need it.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {/* Free ticket */}
              <div
                className="relative flex overflow-hidden rounded-lg border"
                style={{ borderColor: "#d8d2c1", backgroundColor: "#fff" }}
              >
                <div className="flex-1 p-6">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-board)", color: "#9a978c" }}
                  >
                    Boarding pass
                  </p>
                  <p className="mt-1 text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: INK }}>
                    Free
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "#5b584d" }}>
                    10 jobs &middot; 3 AI scans / mo
                  </p>
                </div>
                <div
                  className="relative flex w-24 shrink-0 flex-col items-center justify-center border-l border-dashed"
                  style={{ borderColor: "#d8d2c1" }}
                >
                  <span
                    className="rounded-full bg-[#f0ece2] absolute -left-2 -top-2 h-4 w-4"
                    aria-hidden
                  />
                  <span
                    className="rounded-full bg-[#f0ece2] absolute -left-2 -bottom-2 h-4 w-4"
                    aria-hidden
                  />
                  <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-board)", color: INK }}>
                    ৳0
                  </span>
                </div>
              </div>

              {/* Pro ticket */}
              <div
                className="relative flex overflow-hidden rounded-lg border"
                style={{ borderColor: AMBER, backgroundColor: INK }}
              >
                <div className="flex-1 p-6">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-board)", color: AMBER }}
                  >
                    Boarding pass
                  </p>
                  <p className="mt-1 text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: PAPER }}>
                    Pro
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "#b7b4a8" }}>
                    Unlimited jobs &middot; Unlimited scans
                  </p>
                </div>
                <div
                  className="relative flex w-24 shrink-0 flex-col items-center justify-center border-l border-dashed"
                  style={{ borderColor: "#3a3d47" }}
                >
                  <span className="rounded-full bg-[#f0ece2] absolute -left-2 -top-2 h-4 w-4" aria-hidden />
                  <span className="rounded-full bg-[#f0ece2] absolute -left-2 -bottom-2 h-4 w-4" aria-hidden />
                  <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-board)", color: AMBER }}>
                    ৳499
                  </span>
                  <span className="text-[10px]" style={{ color: "#7b7e88" }}>
                    / mo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/register">
                <Button
                  className="h-12 rounded-md px-8 text-base font-semibold hover:brightness-105"
                  style={{ backgroundColor: INK, color: PAPER }}
                >
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