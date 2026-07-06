import AppSidebar from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <SidebarProvider>
                <TooltipProvider>
                    <AppSidebar />
                </TooltipProvider>
                <main className="flex-1">
                    <SiteHeader />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}