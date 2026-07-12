"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
  validateLoginInput,
  type FieldErrors,
} from "@/lib/auth/auth-schemas"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialAuthButton } from "@/components/auth/social-auth-button"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("error") === "google") {
      toast.error("Google sign-in was cancelled or failed. Please try again.")
      router.replace("/log-in")
    }
  }, [router, searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateLoginInput({ email, password })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsPending(true)

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      })

      if (result.error) {
        toast.error(getAuthErrorMessage(result.error))
        return
      }

      toast.success("Welcome back!")
      router.push("/dashboard")
      router.refresh()
    } catch {
      toast.error("Unable to sign in. Please try again.")
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Use your email and password, or continue with Google
          </p>
        </div>

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
              if (errors.email) {
                setErrors((current: FieldErrors) => ({ ...current, email: undefined }))
              }
            }}
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>

        <Field data-invalid={!!errors.password}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) {
                setErrors((current: FieldErrors) => ({ ...current, password: undefined }))
              }
            }}
            aria-invalid={!!errors.password}
          />
          <FieldError>{errors.password}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            <LoadingSwap isLoading={isPending}>Login</LoadingSwap>
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <SocialAuthButton label="Login with Google" />
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
