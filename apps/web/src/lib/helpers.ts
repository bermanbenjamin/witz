import { cookies } from 'next/headers'

export function setInCookies(token: string) {
  return cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7days
  })
}

