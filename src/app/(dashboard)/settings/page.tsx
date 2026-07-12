import { Suspense } from "react"
import { SettingsPageClient } from "@/components/settings/settings-page"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { SettingsUser } from "@/components/settings/settings-config"

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/log-in")
  }

  const user = session.user as SettingsUser

  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground"></div>}>
      <SettingsPageClient user={user} />
    </Suspense>
  )
}
