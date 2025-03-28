import { type NextRequest, NextResponse } from 'next/server'
import { NextHttp } from './api/next/next-http'
import { RedirectByRoleMiddleware, VerifyJwtMiddleware } from './api/controllers/auth'

const Middleware = async (request: NextRequest) => {
  const http = await NextHttp({ request })
  const controllers = [VerifyJwtMiddleware(), RedirectByRoleMiddleware()]

  for (const controller of controllers) {
    const response = await controller.handle(http)
    if (response.isRedirecting) return response.body
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export default Middleware
