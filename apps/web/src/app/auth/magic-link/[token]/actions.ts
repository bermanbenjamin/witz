'use server'

import { HTTPError } from 'ky'

import { verifyMagicLinkService } from '@/http/auth/verify-magic-link-token'
import { setInCookies } from '@/lib/helpers'

export async function signInWithMagicLinkVerifierAction(secret: string) {
  try {
    const { token } = await verifyMagicLinkService({
      secret,
    })

    setInCookies(token)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Algo deu errado, tente novamente em alguns instantes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
