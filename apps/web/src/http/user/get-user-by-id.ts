

import type { UserDTO } from '@/lib/model'

import { api } from '../api-client'

interface GetUserByIdRequest {
  userId: string
}

interface GetUserByIdResponse extends UserDTO {}

export async function getUserByIdService({ userId }: GetUserByIdRequest) {
  const result = await api.get(`users/${userId}`).json<GetUserByIdResponse>()

  return result
}
