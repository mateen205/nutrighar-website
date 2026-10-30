import { getSession } from "@/lib/auth";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={session ? { fullName: session.fullName, email: session.email } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
