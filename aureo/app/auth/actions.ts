"use server";

import { redirect } from "next/navigation";

import { loginUser, registerUser } from "@/lib/auth";

export async function registerAction(formData: FormData): Promise<void> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await registerUser({
    name,
    email,
    password,
  });

  if (!result.success) {
    redirect(`/register?error=${encodeURIComponent(result.message)}`);
  }

  redirect("/login");
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await loginUser({
    email,
    password,
  });

  if (!result.success) {
    redirect(`/login?error=${encodeURIComponent(result.message)}`);
  }

  redirect("/dashboard");
}

