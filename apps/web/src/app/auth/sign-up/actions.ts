'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUpService } from '@/http/auth/sign-up'

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Por favor, informe seu endereço de e-mail.' }),
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, informe seu nome completo.',
    }),
    password: z.string().min(6, { message: 'Senha deve conter ao menos 6 caracteres' }),
    password_confirmation: z.string(),
    cpf: z.string({ message: 'Por favor, informe seu CPF.' }),
    phone: z.string({ message: 'Por favor, informe seu telefone.' }),
    birthDate: z.date({ required_error: 'Por favor, informe sua data de nascimento.' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: z.infer<typeof signUpSchema>) {
  const { name, email, password, cpf, birthDate, phone } = data

  try {
    await signUpService({
      name,
      email,
      password,
      cpf,
      birthDate: new Date(birthDate),
      phone,
      role: 'MEMBER'
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