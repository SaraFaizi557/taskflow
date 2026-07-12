"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { authClient } from "@/lib/auth/auth-client"
import { cn } from "@/lib/utils"

type LogoutButtonProps = {
  variant?: "button" | "menu-item"
  className?: string
}

export function LogoutButton({
  variant = "button",
  className,
}: LogoutButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut()
      setOpen(false)
      router.push("/log-in")
      router.refresh()
    })
  }

  const trigger =
    variant === "menu-item" ? (
      <button
        type="button"
        className={cn(
          "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive outline-hidden select-none hover:bg-destructive/10",
          className,
        )}
      >
        <LogOutIcon className="size-4" />
        Log out
      </button>
    ) : (
      <Button type="button" variant="destructive" className={className}>
        <LogOutIcon className="size-4" />
        Log out
      </Button>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Log out of TaskFlow?</DialogTitle>
          <DialogDescription>
            You will be signed out on this device. You can sign back in anytime.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleLogout}
          >
            <LoadingSwap isLoading={isPending}>Log out</LoadingSwap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
