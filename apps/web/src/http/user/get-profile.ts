import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: Role
  }
}

export async function getProfile() {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
