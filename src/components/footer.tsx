import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-heading text-lg font-bold">
            Hire<span className="text-brand-indigo">Zen</span>
          </p>
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} HireZen. Built for job seekers who mean business.
          </p>
          <div className="flex gap-6 text-sm text-foreground/70">
            <Link href="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link href="/register" className="hover:text-foreground">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}