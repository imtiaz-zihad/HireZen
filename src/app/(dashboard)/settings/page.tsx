import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { PasswordForm } from "@/components/dashboard/password-form";

export default async function SettingsPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: { subscription: true },
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Manage your account and preferences.
        </p>
      </div>

      <div className="card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">Profile</h2>
        <ProfileForm defaultName={user.name ?? ""} email={user.email} />
      </div>

      <div className="card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">Password</h2>
        <PasswordForm hasPassword={Boolean(user.password)} />
      </div>

      <div className="card-base">
        <h2 className="mb-4 font-heading text-lg font-bold">Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {user.subscription?.plan === "PRO" || user.subscription?.plan === "PREMIUM"
                ? "Pro plan"
                : "Free plan"}
            </p>
            <p className="text-xs text-foreground/50">
              {user.subscription?.plan === "FREE" || !user.subscription
                ? "10 jobs, 3 AI scans per month"
                : "Unlimited jobs and AI scans"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}