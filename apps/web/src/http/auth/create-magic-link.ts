import { api } from '../api-client'

interface SignInWithMagicLinkRequest {
  email: string
  name: string
}

export async function signInWithMagicLink({
  email,
  name,
}: SignInWithMagicLinkRequest) {
  const result = await api.post('auth/magic-link/login', {
    json: {
      email,
      name,
    },
  })

  return result
}
