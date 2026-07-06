import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
                <div className="flex-1 p-2">
                    <SidebarTrigger />
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
}