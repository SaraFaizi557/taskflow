"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavUserMenuContent } from "@/components/layout/nav-user-menu-content"
import {
  getUserInitials,
  type NavUserData,
} from "@/components/layout/nav-user-menu"

type HeaderNavUserProps = {
  user: NavUserData
}

export function HeaderNavUser({ user }: HeaderNavUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full data-[state=open]:bg-accent"
          aria-label="Open user menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="text-xs">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-56">
        <NavUserMenuContent user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
