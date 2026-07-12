"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { IconSettings } from "@tabler/icons-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { settingsSections } from "@/components/settings/settings-config"

function NavSettingsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isSettingsPage = pathname === "/settings"
  const activeSection = searchParams.get("section") ?? "profile"
  const [open, setOpen] = useState(isSettingsPage)

  useEffect(() => {
    if (isSettingsPage) {
      setOpen(true)
    }
  }, [isSettingsPage])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Other</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Settings" isActive={isSettingsPage}>
                  <IconSettings />
                  <span>Settings</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {settingsSections.map((section) => {
                    const Icon = section.icon

                    return (
                      <SidebarMenuSubItem key={section.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            isSettingsPage && activeSection === section.id
                          }
                        >
                          <Link href={`/settings?section=${section.id}`}>
                            <Icon />
                            <span>{section.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function NavSettings() {
  return (
    <Suspense fallback={null}>
      <NavSettingsContent />
    </Suspense>
  )
}
