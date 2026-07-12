import AppSidebar from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/log-in");
    }

    return (
        <div className="flex">
            <SidebarProvider>
                <TooltipProvider>
                    <AppSidebar user={session.user} />
                </TooltipProvider>
                <main className="flex-1">
                    <SiteHeader user={session.user} />
                    <div className="">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}