"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { toast } from "sonner";

import { addBankAccountAction, AddBankAccountState } from "@/app/accounts/actions";
import OnboardingBody from "@/components/shared/onboarding/OnboardingBody";
import OnboardingFooter from "@/components/shared/onboarding/OnboardingFooter";
import OnboardingHeader from "@/components/shared/onboarding/OnboardingHeader";

const initialState: AddBankAccountState = { success: false, message: "" };

export default function OnboardingModal() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    domain: string;
  } | null>(null);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const [accountType, setAccountType] = useState<
    "COURANT" | "EPARGNE" | "LIVRET" | "INVESTISSEMENT" | "AUTRE"
  >("COURANT");

  const [state, formAction, isPending] = useActionState(
    addBankAccountAction,
    initialState
  );

  useEffect(() => {
    if (!state.success && (state.message || state.errors)) {
      if (state.message) {
        toast.error(state.message);
      }
      if (state.errors) {
        Object.values(state.errors)
          .filter(Boolean)
          .forEach((msg) => toast.error(msg as string));
      }
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  function handleClose() {
    router.refresh();
  }

  const effectiveStep = state.success ? 2 : step;
  const balanceValue = Number.parseFloat(balance.replace(",", "."));
  const canSubmitStep2 =
    accountName.trim().length > 0 &&
    balance.trim().length > 0 &&
    !Number.isNaN(balanceValue) &&
    balanceValue > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative w-full max-w-md bg-card border border-border/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <OnboardingHeader step={effectiveStep} onClose={handleClose} />
        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <OnboardingBody
            step={effectiveStep}
            stepKey={step}
            selectedBank={selectedBank}
            onSelectBank={(name, domain) => setSelectedBank({ name, domain })}
            accountName={accountName}
            balance={balance}
            accountType={accountType}
            onAccountNameChange={setAccountName}
            onBalanceChange={setBalance}
            onAccountTypeChange={setAccountType}
          />
          <OnboardingFooter
            step={effectiveStep}
            hasSelectedBank={!!selectedBank}
            isPending={isPending}
            canSubmit={canSubmitStep2}
            onBack={() => setStep(0)}
            onContinue={() => setStep(1)}
            onClose={handleClose}
          />
        </form>
      </motion.div>
    </div>
  );
}
