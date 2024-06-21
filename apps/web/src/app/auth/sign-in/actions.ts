'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithMagicLinkService } from '@/http/auth/create-magic-link'
import { signInWithPasswordService } from '@/http/auth/sign-in-with-password'
import { setInCookies } from '@/lib/helpers'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, informe seu endereço de e-mail.' }),
  password: z.string().min(1, { message: 'Por favor, informe sua senha.' }),
})

const magicLinkSchema = z.object({
  email: z.string({ message: 'Email é obrigatório.' }).email({
    message: 'Email inválido.',
  }),
  name: z.string().refine((value) => value.split(' ').length > 1, {
    message: 'Por favor, informe seu nome completo.',
  }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPasswordService({
      email,
      password,
    })

    setInCookies(token)
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

export async function signInWithMagicLinkAction(data: FormData) {
const result = magicLinkSchema.safeParse(Object.fromEntries(data))

if (!result.success) {
  const errors = result.error.flatten().fieldErrors

  return { success: false, message: null, errors }
}

const { email, name } = result.data

try {
  await signInWithMagicLinkService({
    email,
    name
  })

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
