import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  return (
    <section className="bg-ng-cream/30 py-8 sm:py-10">
      <div className="container-ng grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <DashboardSidebar user={{ fullName: user.fullName, email: user.email }} />
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
