import { auth } from "@/lib/auth/auth"
import { getServerEmailError } from "@/lib/auth/validate-email.server"
import { toNextJsHandler } from "better-auth/next-js"
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next"
import { findIp } from "@arcjet/ip"

const aj = arcjet({
  key: process.env.ARCJET_API_KEY!,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
})

const botSettings = {
  mode: "LIVE",
  allow: ["STRIPE_WEBHOOK"],
} satisfies BotOptions

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>

const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>

const emailSettings = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions

const authHandlers = toNextJsHandler(auth)
export const { GET } = authHandlers

function authErrorResponse(message: string, code: string, status = 400) {
  return Response.json({ code, message }, { status })
}

export async function POST(request: Request) {
  const clonedRequest = request.clone()
  const pathname = new URL(request.url).pathname
  let signupEmail: string | undefined

  if (pathname.endsWith("/sign-up/email")) {
    const body = (await request.json()) as unknown

    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      signupEmail = body.email

      const emailError = await getServerEmailError(signupEmail)
      if (emailError) {
        return authErrorResponse(emailError, "INVALID_EMAIL")
      }
    }
  }

  const decision = await checkArcjet(request, signupEmail)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return authErrorResponse(
        "Too many attempts. Please try again later.",
        "RATE_LIMITED",
        429,
      )
    }

    if (decision.reason.isEmail()) {
      let message = "Invalid email address."

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid."
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed."
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "This email domain cannot receive mail. Use a real email address."
      }

      return authErrorResponse(message, "INVALID_EMAIL")
    }

    return authErrorResponse(
      "Request blocked for security reasons.",
      "FORBIDDEN",
      403,
    )
  }

  return authHandlers.POST(clonedRequest)
}

async function checkArcjet(request: Request, signupEmail?: string) {
  const pathname = new URL(request.url).pathname
  const session = await auth.api.getSession({ headers: request.headers })
  const userIdOrIp = (session?.user.id ?? findIp(request)) || "127.0.0.1"

  if (pathname.endsWith("/sign-up/email") && signupEmail) {
    return aj
      .withRule(
        protectSignup({
          email: emailSettings,
          bots: botSettings,
          rateLimit: restrictiveRateLimitSettings,
        }),
      )
      .protect(request, { email: signupEmail, userIdOrIp })
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(
      slidingWindow(
        pathname.endsWith("/sign-up/email")
          ? restrictiveRateLimitSettings
          : laxRateLimitSettings,
      ),
    )
    .protect(request, { userIdOrIp })
}
