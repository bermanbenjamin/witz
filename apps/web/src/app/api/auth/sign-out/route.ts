import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { appRoutes } from '@/lib/constants'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = appRoutes.signIn

  cookies().delete('token')

  return NextResponse.redirect(redirectUrl)
}
