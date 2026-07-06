"use client";

import {
    BellIcon,
    ChevronsUpDown,
    LogOutIcon,
    UserIcon
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
    SidebarMenuButton,
    useSidebar
} from "../ui/sidebar";
import { cn } from "@/lib/utils";


const dropdownMenuItems = [
    {
        label: "Account",
        icon: <UserIcon />,
        href: "/account"
    },
    {
        label: "Notifications",
        icon: <BellIcon />,
        href: "/notifications"
    }
]


export default function NavUser() {

    const { state } = useSidebar();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p>Sara</p>
                            <p>sara@example.com</p>
                        </div>
                    </div>
                    <ChevronsUpDown />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
            side={state === "collapsed" ? "right" : "top"} 
            sideOffset={20}
            align="end" 
            className={cn(
                "rounded-lg",
                state === "collapsed" ? "w-45" : ""
            )}>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-left">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                Sara
                            </span>

                            <span className="truncate text-xs text-muted-foreground">
                                sara@example.com
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownMenuItems.map((item) => {
                    return (
                        <DropdownMenuItem key={item.label}>
                            <div className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOutIcon />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}