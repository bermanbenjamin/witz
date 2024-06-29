'use server'

import { format } from 'date-fns'
import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUpService } from '@/http/auth/sign-up'

import type { signUpSchema } from './components/form-sign-up/use-form-sign-up'

export async function signUpAction(
  data: z.infer<typeof signUpSchema>,
  isCompleteRegister?: boolean,
) {
  const { name, email, password, cpf, birthDate, phone } = data

  try {
    await signUpService({
      name,
      email,
      password,
      cpf,
      birthDate: format(birthDate, 'dd/MM/yyyy'),
      phone,
      role: 'MEMBER',
      isCompleteRegister: isCompleteRegister ?? false,
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
