"use client"
import * as React from "react"
import {
  Search,
  SettingsIcon,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { IconCalendarMonth, IconCategory, IconDeviceFloppy, IconListDetails, IconMoon, IconSun } from "@tabler/icons-react"

export function CommandWithGroups() {

  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconCategory,
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: IconListDetails,
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: IconCalendarMonth,
      },
    ],
    navTheme: [
      {
        title: "Light",
        shortcut: "⌘L",
        icon: IconSun,
      },
      {
        title: "Dark",
        shortcut: "⌘D",
        icon: IconMoon,
      },
      {
        title: "System",
        shortcut: "⌘S",
        icon: IconDeviceFloppy,
      },
    ],
  }

  return (
    <div className="flex flex-col gap-4">
      <div onClick={() => setOpen(true)}className="w-fit border border-input rounded-lg px-3 py-1.5 flex cursor-default">
        <div className="flex items-center gap-2 flex-1 md:w-40">
          <Search className="w-4 h-4" />
          <span className="hidden md:block text-sm font-normal text-muted-foreground">Search...</span>
        </div>
        <CommandShortcut className="hidden md:block">⌘K</CommandShortcut>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="General">
              {data.navMain.map((item) => (
                <CommandItem onSelect={() => {
                  setOpen(false)
                  router.push(item.url)
                }} key={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Theme">
              {data.navTheme.map((item) => (
                <CommandItem key={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Other">
              <CommandItem onSelect={() => {
                setOpen(false)
                router.push("/settings")
              }}>
                <SettingsIcon />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
