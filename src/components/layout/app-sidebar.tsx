"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavUser from "./nav-user";
import Link from "next/link";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { IconCalendarMonth, IconCategory, IconListDetails, IconMessageCircle, IconSettings } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { NavSecondary } from "./nav-secondary";

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
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
}

export default function AppSidebar() {

  return (
    <Sidebar variant="inset" className="border-r border-border" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <Image src="/logo.png" alt="Task Flow" width={25 } height={25} />
                <span className="text-base font-semibold">Task Flow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
      <NavMain items={data.navMain} />
      <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="" />
    </Sidebar>
  );
}