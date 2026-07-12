import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconBell } from "@tabler/icons-react"
import { CommandWithGroups } from "./command-with-groups"
import { HeaderNavUser } from "./header-nav-user"
import { ThemeKeyboardShortcuts } from "./theme-toggle"

type SiteHeaderProps = {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
  }
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b py-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <ThemeKeyboardShortcuts />
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <CommandWithGroups />
          <Button variant="ghost" size="icon">
            <IconBell />
          </Button>
          <HeaderNavUser user={user} />
        </div>
      </div>
    </header>
  )
}
