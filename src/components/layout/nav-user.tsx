"use client"

import { ChevronsUpDown } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarMenuButton, useSidebar } from "../ui/sidebar"
import { cn } from "@/lib/utils"
import { NavUserMenuContent } from "@/components/layout/nav-user-menu-content"
import {
  getUserInitials,
  type NavUserData,
} from "@/components/layout/nav-user-menu"

type NavUserProps = {
  user: NavUserData
}

export default function NavUser({ user }: NavUserProps) {
  const { state } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          tooltip={user.name}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="rounded-lg text-xs">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={state === "collapsed" ? "right" : "top"}
        sideOffset={20}
        align="end"
        className={cn(
          "w-56 rounded-lg",
          state === "collapsed" ? "w-45" : "",
        )}
      >
        <NavUserMenuContent user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
