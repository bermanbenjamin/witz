import type { ProfileType } from '@witz/api/src/models/profile-type'
import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface SuitabilityDTO {
    id: string,
    createdAt: Date,
    score: number,
}

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: Role
    profileType: ProfileType
    suitabilities: SuitabilityDTO[]
  }
}

export async function getProfileService() {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
