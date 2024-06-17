import type { ProfileType } from '@witz/api/src/models/profile-type'
import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: Role
    profileType: ProfileType
  }
}

export async function getProfile() {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
