import { NextResponse } from 'next/server'

export function middleware() {
  //TODO: Implement middleware to check protected routes (admin)
  // if(request.nextUrl.pathname === '/admin' && !request.user?.isAdmin) {
  //   return NextResponse.redirect(appRoutes.home)
  // }

  return NextResponse.next()
}