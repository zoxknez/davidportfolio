import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <DashboardSidebar user={session.user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader user={session.user} />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
