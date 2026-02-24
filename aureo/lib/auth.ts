import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z
    .string("Le nom est requis")
    .min(1, { message: "Le nom doit avoir au moins 1 caractère" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" })
    .trim(),
  email: z
    .string("L'email est requis")
    .trim()
    .toLowerCase()
    .pipe(
      z.email({
        message: "L'email est invalide",
      }),
    )
    .pipe(
      z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "L'email est invalide",
      }),
    ),
  password: z
    .string("Le mot de passe est requis")
    .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères" })
    .regex(/[a-z]/, {
      message: "Le mot de passe doit contenir au moins une lettre minuscule",
    })
    .regex(/[A-Z]/, {
      message: "Le mot de passe doit contenir au moins une lettre majuscule",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial",
    }),
});

const loginSchema = z.object({
  email: z
    .string("L'email est requis")
    .trim()
    .toLowerCase()
    .pipe(
      z.email({
        message: "L'email est invalide",
      }))
    .pipe(
      z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "L'email est invalide",
      }),
    ),
  password: z
    .string("Le mot de passe est requis")
    .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères" })
    .regex(/[a-z]/, {
      message: "Le mot de passe doit contenir au moins une lettre minuscule",
    })
    .regex(/[A-Z]/, {
      message: "Le mot de passe doit contenir au moins une lettre majuscule",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial",
    }),
});

type AuthError = {
  success: false;
  status: number;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

type AuthSuccess<T> = {
  success: true;
  status: number;
  data: T;
};

type RegisterUser = {
  id: string;
  name: string | null;
  email: string | null;
};

type LoginUser = RegisterUser;

function validationError(error: z.ZodError): AuthError {
  const fieldErrors = error.format();
  const formatted: Record<string, string[]> = {};
  let firstErrorMessage = "Données invalides";

  Object.entries(fieldErrors).forEach(([key, value]) => {
    if (key !== "_errors" && value && "_errors" in value && value._errors.length > 0) {
      formatted[key] = value._errors;
      if (firstErrorMessage === "Données invalides") {
        firstErrorMessage = value._errors[0];
      }
    }
  });

  return {
    success: false,
    status: 400,
    message: firstErrorMessage,
    fieldErrors: formatted,
  };
}

export async function registerUser(input: unknown): Promise<AuthError | AuthSuccess<RegisterUser>> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return {
      success: false,
      status: 409,
      message: "Un compte existe déjà avec cet email",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return {
    success: true,
    status: 201,
    data: {
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
    },
  };
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function loginUser(input: unknown): Promise<AuthError | AuthSuccess<LoginUser>> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Réponse générique pour ne pas révéler si l'email existe
  if (!user || !user.passwordHash) {
    return {
      success: false,
      status: 401,
      message: "Identifiants invalides",
    };
  }

  // Vérification du verrouillage de compte
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const retryAfterMin = Math.ceil(
      (user.lockedUntil.getTime() - Date.now()) / 60000,
    );
    return {
      success: false,
      status: 423,
      message: `Compte temporairement verrouillé. Réessayez dans ${retryAfterMin} min.`,
    };
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    const newAttempts = user.loginAttempts + 1;
    const shouldLock = newAttempts >= MAX_LOGIN_ATTEMPTS;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: newAttempts,
        lockedUntil: shouldLock ? new Date(Date.now() + LOCK_DURATION_MS) : null,
      },
    });

    if (shouldLock) {
      return {
        success: false,
        status: 423,
        message: "Trop de tentatives. Compte verrouillé 15 minutes.",
      };
    }

    return {
      success: false,
      status: 401,
      message: `Identifiants invalides (${MAX_LOGIN_ATTEMPTS - newAttempts} tentative(s) restante(s))`,
    };
  }

  // Succès — réinitialiser le compteur
  await prisma.user.update({
    where: { id: user.id },
    data: { loginAttempts: 0, lockedUntil: null },
  });

  return {
    success: true,
    status: 200,
    data: {
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
    },
  };
}
