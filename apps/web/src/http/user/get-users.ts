import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface GetUsersResponse {
  users: {
    id: string
    name: string | null
    email: string
    role: Role
  }[]
}

export async function getUsersService() {
  const result = await api.get('users').json<GetUsersResponse>()

  return result
}
