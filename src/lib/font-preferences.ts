export type AppFont = "geist" | "inter" | "system"

export const FONT_STORAGE_KEY = "taskflow-font"

export const appFonts: { id: AppFont; label: string }[] = [
  { id: "geist", label: "Geist Sans" },
  { id: "inter", label: "Inter" },
  { id: "system", label: "System UI" },
]

export function isAppFont(value: string | null): value is AppFont {
  return value === "geist" || value === "inter" || value === "system"
}

export function applyAppFont(font: AppFont) {
  const root = document.documentElement

  root.dataset.font = font

  switch (font) {
    case "geist":
      root.style.setProperty("--font-sans", "var(--font-geist-sans)")
      break
    case "inter":
      root.style.setProperty("--font-sans", "var(--font-inter)")
      break
    case "system":
      root.style.setProperty(
        "--font-sans",
        "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      )
      break
  }
}

export function getStoredAppFont(): AppFont {
  if (typeof window === "undefined") {
    return "geist"
  }

  const stored = localStorage.getItem(FONT_STORAGE_KEY)
  return isAppFont(stored) ? stored : "geist"
}

export function saveAppFont(font: AppFont) {
  localStorage.setItem(FONT_STORAGE_KEY, font)
  applyAppFont(font)
}
