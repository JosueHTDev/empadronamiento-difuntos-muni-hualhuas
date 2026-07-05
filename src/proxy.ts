import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

const RUTAS_PROTEGIDAS = ['/admin']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) =>
    pathname.startsWith(ruta)
  )

  if (!esRutaProtegida) {
    return NextResponse.next()
  }

  const token = request.cookies.get('session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}