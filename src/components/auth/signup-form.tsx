"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { authClient } from "@/lib/auth/auth-client"
import {
  getAuthErrorMessage,
  validateSignupInput,
  type FieldErrors,
} from "@/lib/auth/auth-schemas"
import {
  limitLength,
  MAX_USERNAME_LENGTH,
} from "@/lib/profile-limits"
import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "@/components/ui/password-input"
import { SocialAuthButton } from "@/components/auth/social-auth-button"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const clearError = (field: keyof FieldErrors) => {
    if (errors[field]) {
      setErrors((current: FieldErrors) => ({ ...current, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateSignupInput({
      name,
      email,
      password,
      confirmPassword,
    })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsPending(true)

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      })

      if (result.error) {
        toast.error(getAuthErrorMessage(result.error))
        return
      }

      toast.success("Account created successfully")
      router.push("/dashboard")
      router.refresh()
    } catch {
      toast.error("Unable to create account. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-1 flex-col gap-6", className)}
      noValidate
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(limitLength(e.target.value, MAX_USERNAME_LENGTH))
              clearError("name")
            }}
            maxLength={MAX_USERNAME_LENGTH}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name}</FieldError>
          <FieldDescription>
            Up to {MAX_USERNAME_LENGTH} characters.
          </FieldDescription>
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError("email")
            }}
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              clearError("password")
            }}
            aria-invalid={!!errors.password}
          >
            <PasswordInputStrengthChecker />
          </PasswordInput>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          <FieldError>{errors.password}</FieldError>
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              clearError("confirmPassword")
            }}
            aria-invalid={!!errors.confirmPassword}
          />
          <FieldError>{errors.confirmPassword}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            <LoadingSwap isLoading={isPending}>Create Account</LoadingSwap>
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <SocialAuthButton label="Sign up with Google" />
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link href="/log-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
