import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth-session";
const SECRET = process.env.NEXTAUTH_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

export async function createSession(userId: string) {
  const token = await encode({
    token: { sub: userId },
    secret: SECRET,
    maxAge: MAX_AGE,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return await decode({ token, secret: SECRET });
  } catch {
    return null;
  }
}
