import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const RUTAS_PROTEGIDAS = ["/admin"];
const HOME_PATH = "/empadronamiento-difuntos";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) =>
    pathname.startsWith(ruta)
  );

  if (!esRutaProtegida) {
    return NextResponse.next();
  }

  const homeUrl = new URL(HOME_PATH, request.url);

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(homeUrl);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(homeUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};