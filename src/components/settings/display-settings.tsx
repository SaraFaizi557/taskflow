"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { Switch } from "@/components/ui/switch"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import {
  defaultDisplayPreferences,
  DISPLAY_PREFS_KEY,
  type DisplayPreferences,
} from "@/components/settings/settings-config"

export function DisplaySettings() {
  const [preferences, setPreferences] = useState<DisplayPreferences>(
    defaultDisplayPreferences,
  )
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(DISPLAY_PREFS_KEY)
    if (!saved) return

    try {
      setPreferences({
        ...defaultDisplayPreferences,
        ...JSON.parse(saved),
      })
    } catch {
      localStorage.removeItem(DISPLAY_PREFS_KEY)
    }
  }, [])

  const updatePreference = (key: keyof DisplayPreferences, value: boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)

    localStorage.setItem(DISPLAY_PREFS_KEY, JSON.stringify(preferences))
    toast.success("Display preferences updated")
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Display</h2>
        <p className="text-sm text-muted-foreground">
          Customize how content is shown in your workspace.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>Workspace display</FieldLabel>
          <ItemGroup className="gap-3">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Show completed tasks</ItemTitle>
                <ItemDescription>
                  Keep completed tasks visible in your task lists.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.showCompletedTasks}
                  onCheckedChange={(checked) =>
                    updatePreference("showCompletedTasks", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Compact sidebar</ItemTitle>
                <ItemDescription>
                  Use a more compact sidebar with smaller labels.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.compactSidebar}
                  onCheckedChange={(checked) =>
                    updatePreference("compactSidebar", checked)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Show task descriptions</ItemTitle>
                <ItemDescription>
                  Display task descriptions in list and board views.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={preferences.showTaskDescriptions}
                  onCheckedChange={(checked) =>
                    updatePreference("showTaskDescriptions", checked)
                  }
                />
              </ItemActions>
            </Item>
          </ItemGroup>
        </Field>

        <Button type="submit" disabled={isPending} className="w-fit">
          <LoadingSwap isLoading={isPending}>Update display</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  )
}
