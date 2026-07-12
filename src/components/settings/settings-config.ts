import {
  IconBell,
  IconDeviceDesktop,
  IconKey,
  IconPalette,
  IconUser,
} from "@tabler/icons-react"

export type SettingsSection =
  | "profile"
  | "account"
  | "appearance"
  | "notifications"
  | "display"

export const settingsSections: {
  id: SettingsSection
  label: string
  icon: typeof IconUser
}[] = [
  { id: "profile", label: "Profile", icon: IconUser },
  { id: "account", label: "Account", icon: IconKey },
  { id: "appearance", label: "Appearance", icon: IconPalette },
  { id: "notifications", label: "Notifications", icon: IconBell },
  { id: "display", label: "Display", icon: IconDeviceDesktop },
]

export type SettingsUser = {
  id: string
  name: string
  email: string
  image?: string | null
  bio?: string | null
}

export type NotificationPreferences = {
  emailNotifications: boolean
  taskNotifications: boolean
  taskReminders: boolean
  marketingEmails: boolean
  securityEmails: boolean
}

export const defaultNotificationPreferences: NotificationPreferences = {
  emailNotifications: true,
  taskNotifications: true,
  taskReminders: true,
  marketingEmails: false,
  securityEmails: true,
}

export type DisplayPreferences = {
  showCompletedTasks: boolean
  compactSidebar: boolean
  showTaskDescriptions: boolean
}

export const defaultDisplayPreferences: DisplayPreferences = {
  showCompletedTasks: true,
  compactSidebar: false,
  showTaskDescriptions: true,
}

export const NOTIFICATION_PREFS_KEY = "taskflow-notification-preferences"
export const DISPLAY_PREFS_KEY = "taskflow-display-preferences"
