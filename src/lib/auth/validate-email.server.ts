import { resolveMx } from "node:dns/promises"
import {
  getClientEmailError,
  getEmailDomain,
  isTrustedEmailDomain,
} from "@/lib/auth/validate-email"

export async function getServerEmailError(email: string): Promise<string | null> {
  const clientError = getClientEmailError(email)
  if (clientError) {
    return clientError
  }

  const domain = getEmailDomain(email)

  if (isTrustedEmailDomain(domain)) {
    return null
  }

  try {
    const records = await resolveMx(domain)
    if (!records.length) {
      return "This email domain cannot receive mail. Use a real email address."
    }
  } catch {
    return "This email domain cannot receive mail. Use a real email address."
  }

  return null
}
