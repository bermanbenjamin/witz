'use server'

import { HTTPError } from 'ky'
import { toast } from 'sonner'

import { getUsersService } from '@/http/user/get-users'

export async function getAllUsers() {
  try {
    const { users } = await getUsersService()

    return users
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      toast.error(message)
      return null
    }

    toast.error('Algo deu errado, tente novamente em alguns instantes.')

    console.error(err)
    
    return null
  }
}