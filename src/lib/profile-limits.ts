export type FieldErrors = Partial<Record<string, string>>

export const MAX_USERNAME_LENGTH = 12
export const MAX_BIO_LENGTH = 50

export function limitLength(text: string, maxLength: number) {
  return text.slice(0, maxLength)
}

export function validateProfileInput(input: {
  name: string
  bio: string
}): FieldErrors {
  const errors: FieldErrors = {}
  const name = input.name.trim()
  const bio = input.bio.trim()

  if (!name) {
    errors.name = "Username is required."
  } else if (name.length > MAX_USERNAME_LENGTH) {
    errors.name = `Username cannot exceed ${MAX_USERNAME_LENGTH} characters.`
  }

  if (bio.length > MAX_BIO_LENGTH) {
    errors.bio = `Bio cannot exceed ${MAX_BIO_LENGTH} characters.`
  }

  return errors
}
