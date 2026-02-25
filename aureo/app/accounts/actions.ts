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

const ACCOUNT_TYPES = ["COURANT", "EPARGNE", "LIVRET", "INVESTISSEMENT", "AUTRE"] as const;
type AccountType = (typeof ACCOUNT_TYPES)[number];

const normalizeText = (value: unknown) =>
  value == null ? "" : String(value);

const requiredText = (message: string) =>
  z.preprocess(normalizeText, z.string().trim().min(1, message));

const requiredTextMax = (message: string, max: number, maxMessage: string) =>
  z.preprocess(
    normalizeText,
    z.string().trim().min(1, message).max(max, maxMessage)
  );

const accountTypeSchema: z.ZodType<AccountType> = z
  .preprocess((v) => (v == null ? "" : String(v)), z.string().trim())
  .refine((v) => v.length > 0, "Type de compte requis")
  .refine((v) => ACCOUNT_TYPES.includes(v as AccountType), "Type de compte invalide")
  .transform((v) => v as AccountType);

const AddBankAccountSchema = z.object({
  bankName: requiredText("Nom de la banque requis"),
  bankDomain: requiredText("Domaine de la banque requis"),
  accountName: requiredTextMax(
    "Nom du compte requis",
    50,
    "Nom du compte trop long"
  ),
  accountType: accountTypeSchema,
  balance: requiredText("Solde requis")
    .transform((v) => parseFloat(v.replace(",", ".")))
    .refine((v) => !Number.isNaN(v), "Solde invalide")
    .refine((v) => v > 0, "Le solde doit être supérieur à 0"),
});

type AddBankAccountInput = z.infer<typeof AddBankAccountSchema>;
type AddBankAccountFieldErrors = z.ZodFlattenedError<AddBankAccountInput>["fieldErrors"];

export type AddBankAccountState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof AddBankAccountSchema>, string>>;
};

const getRawFormData = (formData: FormData) => ({
  bankName: formData.get("bankName"),
  bankDomain: formData.get("bankDomain"),
  accountName: formData.get("accountName"),
  accountType: formData.get("accountType"),
  balance: formData.get("balance"),
});

const toErrorState = (fieldErrors: AddBankAccountFieldErrors): AddBankAccountState => ({
  success: false,
  message: "Veuillez corriger les erreurs.",
  errors: {
    bankName: fieldErrors.bankName?.[0],
    bankDomain: fieldErrors.bankDomain?.[0],
    accountName: fieldErrors.accountName?.[0],
    accountType: fieldErrors.accountType?.[0],
    balance: fieldErrors.balance?.[0],
  },
});

const createBankAccount = async (
  data: AddBankAccountInput,
  userId: string
) => {
  await prisma.bankAccount.create({
    data: {
      name: data.accountName,
      bankName: data.bankName,
      bankDomain: data.bankDomain,
      type: data.accountType,
      balance: data.balance,
      iban: generateFakeIBAN(),
      userId,
    },
  });
};

const markOnboardingComplete = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { onboardingCompleted: true },
  });
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

  const parsed = AddBankAccountSchema.safeParse(getRawFormData(formData));
  if (!parsed.success) {
    return toErrorState(parsed.error.flatten().fieldErrors);
  }

  await createBankAccount(parsed.data, session.sub);
  await markOnboardingComplete(session.sub);

  revalidatePath("/dashboard");

  return { success: true, message: "Compte ajouté avec succès !" };
}
