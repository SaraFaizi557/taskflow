"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { getAuthErrorMessage } from "@/lib/auth/auth-schemas"

const CONFIRMATION_TEXT = "DELETE"

type DeleteAccountDialogProps = {
  email: string
}

export function DeleteAccountDialog({ email }: DeleteAccountDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmation, setConfirmation] = useState("")
  const [isPending, startTransition] = useTransition()

  const canDelete = confirmation === CONFIRMATION_TEXT

  const resetDialog = () => {
    setConfirmation("")
  }

  const handleDelete = () => {
    if (!canDelete) return

    startTransition(async () => {
      const result = await authClient.deleteUser()

      if (result.error) {
        toast.error(getAuthErrorMessage(result.error))
        return
      }

      toast.success("Account deleted")
      setOpen(false)
      resetDialog()
      router.push("/log-in")
      router.refresh()
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          resetDialog()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2Icon className="size-4" />
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete your account permanently?</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                This action cannot be undone. Your account, tasks, and all
                associated data for <strong>{email}</strong> will be permanently
                removed.
              </p>
              <p>
                Type <strong>{CONFIRMATION_TEXT}</strong> below to confirm.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="delete-confirmation">Confirmation</Label>
          <Input
            id="delete-confirmation"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder={CONFIRMATION_TEXT}
            autoComplete="off"
            disabled={isPending}
          />
        </div>

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
            disabled={!canDelete || isPending}
            onClick={handleDelete}
          >
            <LoadingSwap isLoading={isPending}>Delete my account</LoadingSwap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
