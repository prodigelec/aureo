"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// ─── IBAN factice (format FR76) ───────────────────────────────────────────────

function generateFakeIBAN(): string {
  const bankCode = String(Math.floor(Math.random() * 90000) + 10000);
  const branchCode = String(Math.floor(Math.random() * 90000) + 10000);
  const accountNumber = Array.from({ length: 11 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const key = String(Math.floor(Math.random() * 90) + 10);

  return `FR76 ${bankCode} ${branchCode} ${accountNumber.slice(0, 3)} ${accountNumber.slice(3, 6)} ${accountNumber.slice(6, 9)} ${accountNumber.slice(9)} ${key}`;
}

// ─── Schéma de validation ─────────────────────────────────────────────────────

const AddBankAccountSchema = z.object({
  bankName: z.string().min(1, "Nom de la banque requis"),
  bankDomain: z.string().min(1),
  accountName: z.string().min(1, "Nom du compte requis").max(50),
  accountType: z.enum(["CHECKING", "SAVINGS", "LIVRET", "INVESTMENT", "OTHER"]),
  balance: z.coerce.number().min(0, "Le solde doit être positif"),
});

export type AddBankAccountState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof AddBankAccountSchema>, string>>;
};

// ─── Server Action ────────────────────────────────────────────────────────────

export async function addBankAccountAction(
  _prevState: AddBankAccountState,
  formData: FormData
): Promise<AddBankAccountState> {
  const session = await getSession();
  if (!session?.sub) {
    return { success: false, message: "Non authentifié." };
  }

  const raw = {
    bankName: formData.get("bankName"),
    bankDomain: formData.get("bankDomain"),
    accountName: formData.get("accountName"),
    accountType: formData.get("accountType"),
    balance: formData.get("balance"),
  };

  const parsed = AddBankAccountSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Veuillez corriger les erreurs.",
      errors: {
        bankName: fieldErrors.bankName?.[0],
        bankDomain: fieldErrors.bankDomain?.[0],
        accountName: fieldErrors.accountName?.[0],
        accountType: fieldErrors.accountType?.[0],
        balance: fieldErrors.balance?.[0],
      },
    };
  }

  const { bankName, bankDomain, accountName, accountType, balance } =
    parsed.data;

  await prisma.bankAccount.create({
    data: {
      name: accountName,
      bankName,
      bankDomain,
      type: accountType,
      balance,
      iban: generateFakeIBAN(),
      userId: session.sub,
    },
  });

  // Marquer l'onboarding comme terminé
  await prisma.user.update({
    where: { id: session.sub },
    data: { onboardingCompleted: true },
  });

  revalidatePath("/dashboard");

  return { success: true, message: "Compte ajouté avec succès !" };
}
