import type { UserDTO } from '@/lib/model'

import { api } from '../api-client'

interface GetProfileResponse {
  user: UserDTO
}

export async function getProfileService() {
  const { user } = await api.get('profile').json<GetProfileResponse>()

  return user
}
