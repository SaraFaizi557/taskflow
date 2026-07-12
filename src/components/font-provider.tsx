"use client"

import { useEffect } from "react"
import { applyAppFont, getStoredAppFont } from "@/lib/font-preferences"

export function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyAppFont(getStoredAppFont())
  }, [])

  return children
}
