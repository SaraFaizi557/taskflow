import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { IconBell } from "@tabler/icons-react"
import { CommandWithGroups } from "./command-with-groups"

export function SiteHeader() {
    return (
        <header className="flex py-3 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-8"
                />
                <div className="flex ml-auto flex items-center gap-2">
                    <CommandWithGroups />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-8"
                    />
                    <ThemeToggle />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-8"
                    />
                    <Button variant="ghost" size="icon">
                        <IconBell />
                    </Button>
                </div>
            </div>
        </header>
    )
}