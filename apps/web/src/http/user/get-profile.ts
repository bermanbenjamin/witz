import type { ProfileType } from '@witz/api/src/models/profile-type'
import type { SuitabilityDTO } from '@witz/api/src/models/suitability'
import type { Role } from '@witz/auth'

import { api } from '../api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: Role
    phone: string
    cpf: string
    birthDate: string
    profileType: ProfileType
    suitabilities: SuitabilityDTO[]
  }
}

export async function getProfileService() {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
