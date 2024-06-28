import { defineAbilityFor } from '@witz/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfileService } from '@/http/user/get-profile'

import { appRoutes } from './constants'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function ability() {
  const response = await auth()

  if (!response) return null

  const { user } = response

  const ability = defineAbilityFor({ id: user.id, role: user.role })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect(appRoutes.signIn)
  }

  try {
    const { user } = await getProfileService()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
