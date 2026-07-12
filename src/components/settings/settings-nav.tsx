"use client"

import { cn } from "@/lib/utils"
import {
  settingsSections,
  type SettingsSection,
} from "@/components/settings/settings-config"

type SettingsNavProps = {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
}

export function SettingsNav({
  activeSection,
  onSectionChange,
}: SettingsNavProps) {
  return (
    <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
      {settingsSections.map((section) => {
        const Icon = section.icon
        const isActive = activeSection === section.id

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {section.label}
          </button>
        )
      })}
    </nav>
  )
}
