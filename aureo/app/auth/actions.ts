"use server";

import { redirect } from "next/navigation";

import { loginUser, registerUser } from "@/lib/auth";

type ActionState =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function registerAction(formData: FormData): Promise<ActionState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await registerUser({
    name,
    email,
    password,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      fieldErrors: result.fieldErrors,
    };
  }

  redirect("/login");
}

export async function loginAction(formData: FormData): Promise<ActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await loginUser({
    email,
    password,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      fieldErrors: result.fieldErrors,
    };
  }

  redirect("/dashboard");
}

