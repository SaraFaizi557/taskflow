"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          // Ignore typing in inputs
          if (
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement
          ) {
            return
          }
    
          switch (e.key.toLowerCase()) {
            case "l":
              setTheme("light")
              break
            case "d":
              setTheme("dark")
              break
            case "s":
              setTheme("system")
              break
          }
        }
    
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
      }, [setTheme])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-36"
            >
                <DropdownMenuGroup>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-accent text-accent-foreground" : ""}>
                        Light
                        <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-accent text-accent-foreground" : ""}>
                        Dark
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-accent text-accent-foreground" : ""}>
                        System
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
    </DropdownMenu >
  )
}