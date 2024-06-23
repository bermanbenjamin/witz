import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  birthDate: Date
  role: Role
}

type SignUpResponse = void

export async function signUpService({
  name,
  email,
  password,
  birthDate,
  cpf,
  phone,
  role
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('users', {
    json: {
      name,
      email,
      password,
      birthDate,
      cpf,
      phone,
      role
    },
  })
}
