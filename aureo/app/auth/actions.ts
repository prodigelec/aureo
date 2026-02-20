"use server";

import { redirect } from "next/navigation";

import { loginUser, registerUser } from "@/lib/auth";

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await registerUser({
    name,
    email,
    password,
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  redirect("/register?success=" + encodeURIComponent("Enregistrement de votre compte réussi! 👍"));
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await loginUser({
    email,
    password,
  });

  if (!result.success) {
    return { success: false, message: result.message };
  }

  redirect("/dashboard");
}

