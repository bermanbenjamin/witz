import { api } from '../api-client'

interface VerifyMagicLinkRequest {
  secret: string
}

interface VerifyMagicLinkResponse {
  token: string
}

export async function verifyMagicLink({ secret }: VerifyMagicLinkRequest) {
  const result = await api
    .post('auth/magic-link/verify', {
      json: {
        token: secret,
      },
    })
    .json<VerifyMagicLinkResponse>()

  return result
}
