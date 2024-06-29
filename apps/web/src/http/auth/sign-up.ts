import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  birthDate: string
  role: Role
  isCompleteRegister: boolean
}

type SignUpResponse = void

export async function signUpService({
  name,
  email,
  password,
  birthDate,
  cpf,
  phone,
  role,
  isCompleteRegister,
}: SignUpRequest): Promise<SignUpResponse> {
  const path = isCompleteRegister ? 'users?type=complete' : 'users'

  console.log(path)

  await api.post(path, {
    json: {
      name,
      email,
      password,
      birthDate,
      cpf,
      phone,
      role,
    },
  })
}
