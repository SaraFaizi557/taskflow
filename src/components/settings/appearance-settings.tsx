"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Computer, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  appFonts,
  getStoredAppFont,
  saveAppFont,
  type AppFont,
} from "@/lib/font-preferences"

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Computer },
] as const

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [font, setFont] = useState<AppFont>("geist")

  useEffect(() => {
    setMounted(true)
    setFont(getStoredAppFont())
  }, [])

  const activeTheme = mounted ? theme ?? "system" : "system"

  const handleFontChange = (value: AppFont) => {
    setFont(value)
    saveAppFont(value)
  }

  return (
    <form className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize how TaskFlow looks on your device.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="font-select">Font</FieldLabel>
          <Select value={font} onValueChange={handleFontChange}>
            <SelectTrigger id="font-select" className="w-full sm:w-72">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {appFonts.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>
            Set the font you want to use in the dashboard.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Theme</FieldLabel>
          <FieldDescription>
            Select the theme for the dashboard.
          </FieldDescription>
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {themes.map((item) => {
              const Icon = item.icon
              const isSelected = activeTheme === item.id
              const previewIsDark =
                item.id === "dark" ||
                (item.id === "system" && resolvedTheme === "dark")

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-colors",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 overflow-hidden rounded-lg border p-3",
                      previewIsDark
                        ? "border-white/10 bg-zinc-950"
                        : "border-black/10 bg-white",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-2 h-2 w-10 rounded-full",
                        previewIsDark ? "bg-zinc-700" : "bg-zinc-200",
                      )}
                    />
                    <div className="space-y-1.5">
                      <div
                        className={cn(
                          "h-2 rounded-full",
                          previewIsDark ? "bg-zinc-800" : "bg-zinc-100",
                        )}
                      />
                      <div
                        className={cn(
                          "h-2 w-4/5 rounded-full",
                          previewIsDark ? "bg-zinc-800" : "bg-zinc-100",
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4" />
                    {item.label}
                  </div>
                </button>
              )
            })}
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
