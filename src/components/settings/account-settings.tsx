"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/auth/logout-button"
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog"
import type { SettingsUser } from "@/components/settings/settings-config"

type AccountSettingsProps = {
  user: SettingsUser
}

export function AccountSettings({ user }: AccountSettingsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and session.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="account-name">Name</FieldLabel>
          <Input id="account-name" value={user.name} disabled />
          <FieldDescription>
            Update your display name from the profile section.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="account-email">Email</FieldLabel>
          <Input id="account-email" value={user.email} disabled />
          <FieldDescription>
            Your sign-in email address.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Session</h3>
          <p className="text-sm text-muted-foreground">
            Sign out from TaskFlow on this device.
          </p>
        </div>
        <LogoutButton />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-destructive">Danger zone</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <DeleteAccountDialog email={user.email} />
      </div>
    </div>
  )
}
