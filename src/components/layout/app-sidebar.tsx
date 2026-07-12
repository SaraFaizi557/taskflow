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
import { IconCalendarMonth, IconCategory, IconListDetails } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { NavSettings } from "./nav-settings";

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
}

interface AppSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function AppSidebar({ user }: AppSidebarProps) {

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
                <Image src="/logo.png" alt="Task Flow" width={25} height={25} />
                <span className="text-base font-semibold">TaskFlow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}