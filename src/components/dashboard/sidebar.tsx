"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CalendarCheck,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/resumes", label: "Resumes", icon: FileText },
  { href: "/interviews", label: "Interviews", icon: CalendarCheck },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card/40 md:block">
      <div className="flex h-full flex-col px-4 py-6">
        <Link href="/" className="mb-8 px-2 font-heading text-xl font-bold tracking-tight">
          Hire<span className="text-brand-indigo">Zen</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-indigo/15 text-brand-indigo"
                    : "text-foreground/60 hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" strokeWidth={1.75} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}