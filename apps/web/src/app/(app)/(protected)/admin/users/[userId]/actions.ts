'use server'

import { HTTPError } from 'ky'

import { getUserByIdService } from '@/http/user/get-user-by-id'

export async function getUserById(userId: string) {
  try {
    const user = await getUserByIdService({ userId })

    return user
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      console.error(message)
      return null
    }

    console.error(err)
    return null
  }
}
