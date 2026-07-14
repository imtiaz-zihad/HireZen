import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          Hire<span className="text-brand-indigo">Zen</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-foreground/70 hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-foreground/70 hover:text-foreground">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link href="/dashboard">
              <Button className="btn-primary">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="btn-primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}