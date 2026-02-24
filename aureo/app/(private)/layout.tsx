import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Sidebar from "@/components/shared/Sidebar";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {children}
      </div>
    </div>
  );
}
