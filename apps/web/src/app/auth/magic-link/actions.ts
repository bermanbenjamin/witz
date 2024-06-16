import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithMagicLink } from '@/http/auth/create-magic-link'

const magicLinkSchema = z.object({
  email: z.string({ message: 'Email é obrigatório.' }).email({
    message: 'Email inválido.',
  }),
})


export async function signInWithMagicLinkAction(data: FormData) {

  const result = magicLinkSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email } = result.data

  try {
    await signInWithMagicLink({
      email
    })

  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Algo deu errado, tente novamente em alguns instantes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
