"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { loginUser, registerUser } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { createSession, deleteSession } from "@/lib/session";

export type AuthActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function registerAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState | void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await registerUser({
    name,
    email,
    password,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      fieldErrors: "fieldErrors" in result ? result.fieldErrors : undefined,
    };
  }

  redirect(
    "/register?success=" +
      encodeURIComponent("Enregistrement de votre compte réussi ! 👍")
  );
}

export async function loginAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState | void> {
  const reqHeaders = await headers();
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0].trim() ??
    reqHeaders.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(`login:${ip}`);
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.retryAfterSeconds / 60)} min.`,
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await loginUser({ email, password });

  if (!result.success) {
    return { success: false, message: result.message, fieldErrors: result.fieldErrors };
  }

  // Succès : on efface le compteur IP
  resetRateLimit(`login:${ip}`);
  await createSession(result.data.id);
  redirect("/dashboard?success=" + encodeURIComponent("Connexion réussie ! Bienvenue."));
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
