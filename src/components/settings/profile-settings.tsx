"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CameraIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { authClient } from "@/lib/auth/auth-client"
import { getAuthErrorMessage } from "@/lib/auth/auth-schemas"
import {
  limitLength,
  MAX_BIO_LENGTH,
  MAX_USERNAME_LENGTH,
  validateProfileInput,
  type FieldErrors,
} from "@/lib/profile-limits"
import type { SettingsUser } from "@/components/settings/settings-config"

type ProfileSettingsProps = {
  user: SettingsUser
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(limitLength(user.name, MAX_USERNAME_LENGTH))
  const [bio, setBio] = useState(limitLength(user.bio ?? "", MAX_BIO_LENGTH))
  const [imagePreview, setImagePreview] = useState(user.image ?? "")
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const nameLength = name.length
  const bioLength = bio.length

  const clearError = (field: keyof FieldErrors) => {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateProfileInput({ name, bio })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsPending(true)

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        bio: bio.trim(),
        image: imagePreview || null,
      })

      if (result.error) {
        toast.error(getAuthErrorMessage(result.error))
        return
      }

      toast.success("Profile updated")
      router.refresh()
    } catch {
      toast.error("Unable to update profile.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>Profile picture</FieldLabel>
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={imagePreview || undefined} alt={name} />
              <AvatarFallback className="text-lg">
                {name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraIcon className="size-4" />
                Upload photo
              </Button>
              <FieldDescription>
                JPG, PNG or GIF. Max size 2MB.
              </FieldDescription>
            </div>
          </div>
        </Field>

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="profile-name">Username</FieldLabel>
          <Input
            id="profile-name"
            value={name}
            onChange={(event) => {
              setName(limitLength(event.target.value, MAX_USERNAME_LENGTH))
              clearError("name")
            }}
            maxLength={MAX_USERNAME_LENGTH}
            placeholder="Your name"
            required
            aria-invalid={!!errors.name}
          />
          <FieldDescription>
            This is your public display name. {nameLength}/{MAX_USERNAME_LENGTH}{" "}
            characters.
          </FieldDescription>
          <FieldError>{errors.name}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="profile-email">Email</FieldLabel>
          <Input
            id="profile-email"
            value={user.email}
            disabled
          />
          <FieldDescription>
            Your email is managed from the account section.
          </FieldDescription>
        </Field>

        <Field data-invalid={!!errors.bio}>
          <FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
          <Textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => {
              setBio(limitLength(event.target.value, MAX_BIO_LENGTH))
              clearError("bio")
            }}
            maxLength={MAX_BIO_LENGTH}
            placeholder="Tell us a little about yourself"
            rows={4}
            aria-invalid={!!errors.bio}
          />
          <FieldDescription>
            Brief description for your profile. {bioLength}/{MAX_BIO_LENGTH}{" "}
            characters.
          </FieldDescription>
          <FieldError>{errors.bio}</FieldError>
        </Field>

        <Button type="submit" disabled={isPending} className="w-fit">
          <LoadingSwap isLoading={isPending}>Update profile</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  )
}
