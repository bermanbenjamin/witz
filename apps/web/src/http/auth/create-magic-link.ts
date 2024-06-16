import { api } from '../api-client'

interface SignInWithMagicLinkRequest {
  email: string
}

export async function signInWithMagicLink({
  email,
}: SignInWithMagicLinkRequest) {
  console.log(email)

  const result = await api.post('auth/magic-link/login', {
    json: {
      email,
    },
  })

  return result
}
