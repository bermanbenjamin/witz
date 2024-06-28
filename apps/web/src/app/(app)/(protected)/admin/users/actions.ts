'use server'

import { HTTPError } from 'ky'

import { getUsersService } from '@/http/user/get-users'

export async function getAllUsers() {
  try {
    const { users } = await getUsersService()

    return users
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
