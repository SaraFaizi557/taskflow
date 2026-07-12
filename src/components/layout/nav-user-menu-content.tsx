"use client"

import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "@/components/auth/logout-button"
import { ThemeMenu } from "@/components/layout/theme-toggle"
import {
  getUserInitials,
  navUserMenuItems,
  type NavUserData,
} from "@/components/layout/nav-user-menu"

type NavUserMenuContentProps = {
  user: NavUserData
}

export function NavUserMenuContent({ user }: NavUserMenuContentProps) {
  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-2 py-1.5 text-left">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {navUserMenuItems.map((item) => {
        const Icon = item.icon

        return (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={item.href} className="flex items-center gap-2">
              <Icon className="size-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        )
      })}
      <DropdownMenuSeparator />
      <ThemeMenu />
      <DropdownMenuSeparator />
      <div className="p-1">
        <LogoutButton variant="menu-item" />
      </div>
    </>
  )
}
