const COMMON_PROVIDER_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
])

const KNOWN_TYPO_DOMAINS = new Set([
  "gmailco.com",
  "gmial.com",
  "gmal.com",
  "gamil.com",
  "gnail.com",
  "gmai.com",
  "gmail.con",
  "gmail.co",
  "yaho.com",
  "yahooo.com",
  "yhoo.com",
  "hotmial.com",
  "hotmil.com",
  "outlok.com",
  "outook.com",
])

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function getEmailDomain(email: string) {
  return email.trim().toLowerCase().split("@")[1] ?? ""
}

export function isTrustedEmailDomain(domain: string) {
  return COMMON_PROVIDER_DOMAINS.has(domain)
}

export function getClientEmailError(email: string): string | null {
  const normalized = email.trim().toLowerCase()

  if (!normalized) {
    return "Email is required."
  }

  if (!EMAIL_FORMAT_REGEX.test(normalized)) {
    return "Enter a valid email address."
  }

  return getTypoEmailError(normalized)
}

function getTypoEmailError(email: string): string | null {
  const domain = getEmailDomain(email)

  if (!domain) {
    return "Enter a valid email address."
  }

  if (KNOWN_TYPO_DOMAINS.has(domain)) {
    return getTypoSuggestion(domain)
  }

  if (
    domain.startsWith("gmail") &&
    domain !== "gmail.com" &&
    domain !== "googlemail.com"
  ) {
    return "Did you mean @gmail.com? This email domain looks incorrect."
  }

  if (domain.startsWith("yahoo") && !domain.endsWith("yahoo.com")) {
    return "Did you mean @yahoo.com? This email domain looks incorrect."
  }

  if (domain.startsWith("hotmail") && domain !== "hotmail.com") {
    return "Did you mean @hotmail.com? This email domain looks incorrect."
  }

  if (domain.startsWith("outlook") && domain !== "outlook.com") {
    return "Did you mean @outlook.com? This email domain looks incorrect."
  }

  return null
}

function getTypoSuggestion(domain: string): string {
  if (domain.includes("gmail") || domain.includes("gmal") || domain.includes("gmial")) {
    return "Did you mean @gmail.com? This email domain looks incorrect."
  }

  if (domain.includes("yahoo") || domain.includes("yaho")) {
    return "Did you mean @yahoo.com? This email domain looks incorrect."
  }

  if (domain.includes("hotmail") || domain.includes("hotmial")) {
    return "Did you mean @hotmail.com? This email domain looks incorrect."
  }

  if (domain.includes("outlook") || domain.includes("outlok")) {
    return "Did you mean @outlook.com? This email domain looks incorrect."
  }

  return "This email domain looks incorrect. Please check for typos."
}
