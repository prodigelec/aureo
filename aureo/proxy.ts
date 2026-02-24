import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "auth-session";
const SECRET = process.env.NEXTAUTH_SECRET!;

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const session = await decode({ token, secret: SECRET });
    if (!session?.sub) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Ajoute ici chaque route privée (ou sous-chemin)
  matcher: ["/dashboard/:path*"],
};
