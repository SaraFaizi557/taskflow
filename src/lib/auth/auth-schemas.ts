import { getClientEmailError } from "@/lib/auth/validate-email"
import {
  MAX_USERNAME_LENGTH,
  type FieldErrors,
} from "@/lib/profile-limits"

export type { FieldErrors }

type AuthError = {
  message?: string
  code?: string
  status?: number
}

export function validateLoginInput(input: {
  email: string
  password: string
}): FieldErrors {
  const errors: FieldErrors = {}
  const emailError = getClientEmailError(input.email)

  if (emailError) {
    errors.email = emailError
  }

  if (!input.password) {
    errors.password = "Password is required."
  }

  return errors
}

export function validateSignupInput(input: {
  name: string
  email: string
  password: string
  confirmPassword: string
}): FieldErrors {
  const errors: FieldErrors = {}
  const name = input.name.trim()
  const emailError = getClientEmailError(input.email)

  if (!name) {
    errors.name = "Name is required."
  } else if (name.length > MAX_USERNAME_LENGTH) {
    errors.name = `Name cannot exceed ${MAX_USERNAME_LENGTH} characters.`
  }

  if (emailError) {
    errors.email = emailError
  }

  if (!input.password) {
    errors.password = "Password is required."
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters."
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Please confirm your password."
  } else if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
  }

  return errors
}

export function getAuthErrorMessage(error: AuthError | null | undefined) {
  if (!error) {
    return "Something went wrong. Please try again."
  }

  switch (error.code) {
    case "INVALID_EMAIL":
      return error.message ?? "Enter a valid email address."
    case "INVALID_EMAIL_OR_PASSWORD":
      return "Invalid email or password. If you signed up with Google, use Login with Google instead."
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with this email already exists. Sign in or use Google instead."
    case "EMAIL_NOT_VERIFIED":
      return "Please verify your email before signing in."
    case "RATE_LIMITED":
      return error.message ?? "Too many attempts. Please try again later."
    case "FORBIDDEN":
      return error.message ?? "Request blocked for security reasons."
    case "SESSION_EXPIRED":
    case "FRESH_SESSION_REQUIRED":
      return "Please sign in again, then try deleting your account."
    default:
      return error.message ?? "Something went wrong. Please try again."
  }
}
