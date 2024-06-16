import { api } from '../api-client'

interface VerifyMagicLinkRequest {
  secret: string
}

interface VerifyMagicLinkResponse {
  token: string
}

export async function verifyMagicLink({ secret }: VerifyMagicLinkRequest) {
  console.log(secret);


  const result = await api
    .post('auth/magic-link/verify', {
      json: {
        token: secret,
      },
    })
    .json<VerifyMagicLinkResponse>()

  console.log("result =" + result);


  return result
}
