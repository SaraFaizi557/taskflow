import { UserIcon } from "lucide-react"
import { IconDeviceDesktop } from "@tabler/icons-react"

export type NavUserData = {
  id: string
  name: string
  email: string
  image?: string | null
}

export function getUserInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
}

export const navUserMenuItems = [
  {
    label: "Account",
    icon: UserIcon,
    href: "/settings?section=account",
  },
  {
    label: "Display",
    icon: IconDeviceDesktop,
    href: "/settings?section=display",
  },
] as const
