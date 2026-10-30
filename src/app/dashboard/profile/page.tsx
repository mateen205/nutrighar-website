import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ng-forest">Profile</h1>
        <p className="mt-1 text-sm text-ng-muted">Keep your contact details up to date</p>
      </div>
      <ProfileForm
        user={{
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
        }}
      />
    </div>
  );
}
