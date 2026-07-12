"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SettingsNav } from "@/components/settings/settings-nav"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationsSettings } from "@/components/settings/notifications-settings"
import { DisplaySettings } from "@/components/settings/display-settings"
import {
  settingsSections,
  type SettingsSection,
  type SettingsUser,
} from "@/components/settings/settings-config"

type SettingsPageClientProps = {
  user: SettingsUser
}

function isSettingsSection(value: string | null): value is SettingsSection {
  return settingsSections.some((section) => section.id === value)
}

export function SettingsPageClient({ user }: SettingsPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")

  useEffect(() => {
    if (isSettingsSection(sectionParam)) {
      setActiveSection(sectionParam)
    }
  }, [sectionParam])

  const handleSectionChange = useCallback(
    (section: SettingsSection) => {
      setActiveSection(section)
      router.replace(`/settings?section=${section}`, { scroll: false })
    },
    [router],
  )

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="hidden lg:block lg:w-52 lg:shrink-0">
          <SettingsNav
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </aside>

        <div className="min-w-0 flex-1 lg:max-w-2xl">
          {activeSection === "profile" && <ProfileSettings user={user} />}
          {activeSection === "account" && <AccountSettings user={user} />}
          {activeSection === "appearance" && <AppearanceSettings />}
          {activeSection === "notifications" && <NotificationsSettings />}
          {activeSection === "display" && <DisplaySettings />}
        </div>
      </div>
    </div>
  )
}
