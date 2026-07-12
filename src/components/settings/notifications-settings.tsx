"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import {
  defaultNotificationPreferences,
  NOTIFICATION_PREFS_KEY,
  type NotificationPreferences,
} from "@/components/settings/settings-config"

export function NotificationsSettings() {
  const [notifyAbout, setNotifyAbout] = useState("all")
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences,
  )
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(NOTIFICATION_PREFS_KEY)
    if (!saved) return

    try {
      setPreferences({
        ...defaultNotificationPreferences,
        ...JSON.parse(saved),
      })
    } catch {
      localStorage.removeItem(NOTIFICATION_PREFS_KEY)
    }
  }, [])

  const updatePreference = (
    key: keyof NotificationPreferences,
    value: boolean,
  ) => {
    setPreferences((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)

    localStorage.setItem(
      NOTIFICATION_PREFS_KEY,
      JSON.stringify({ ...preferences, notifyAbout }),
    )

    toast.success("Notification preferences updated")
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>Notify me about</FieldLabel>
          <RadioGroup
            value={notifyAbout}
            onValueChange={setNotifyAbout}
            className="grid gap-3 pt-1"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="notify-all" />
              <Label htmlFor="notify-all">All activity</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="mentions" id="notify-mentions" />
              <Label htmlFor="notify-mentions">Tasks and mentions only</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="none" id="notify-none" />
              <Label htmlFor="notify-none">Nothing</Label>
            </div>
          </RadioGroup>
        </Field>

        <Field>
          <FieldLabel>Email notifications</FieldLabel>
          <ItemGroup className="gap-3">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Email notifications</ItemTitle>
                <ItemDescription>
                  Receive general email updates about your account.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    updatePreference("emailNotifications", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Task notifications</ItemTitle>
                <ItemDescription>
                  Get notified when tasks are assigned or updated.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.taskNotifications}
                  onCheckedChange={(checked) =>
                    updatePreference("taskNotifications", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Task reminders</ItemTitle>
                <ItemDescription>
                  Receive reminders for upcoming and overdue tasks.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.taskReminders}
                  onCheckedChange={(checked) =>
                    updatePreference("taskReminders", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Marketing emails</ItemTitle>
                <ItemDescription>
                  Receive emails about new features and product updates.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.marketingEmails}
                  onCheckedChange={(checked) =>
                    updatePreference("marketingEmails", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Security emails</ItemTitle>
                <ItemDescription>
                  Receive emails about account activity and security alerts.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.securityEmails}
                  onCheckedChange={(checked) =>
                    updatePreference("securityEmails", checked)
                  }
                />
              </ItemActions>
            </Item>
          </ItemGroup>
        </Field>

        <Button type="submit" disabled={isPending} className="w-fit">
          <LoadingSwap isLoading={isPending}>
            Update notifications
          </LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  )
}
