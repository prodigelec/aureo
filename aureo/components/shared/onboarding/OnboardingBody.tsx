"use client";

import { AnimatePresence, motion } from "framer-motion";

import Step1BankSelect from "@/components/shared/onboarding/Step1BankSelect";
import Step2AccountDetails from "@/components/shared/onboarding/Step2AccountDetails";
import Step3Success from "@/components/shared/onboarding/Step3Success";

export default function OnboardingBody({
  step,
  stepKey,
  selectedBank,
  onSelectBank,
  accountName,
  balance,
  accountType,
  currency,
  iban,
  onAccountNameChange,
  onBalanceChange,
  onAccountTypeChange,
  onCurrencyChange,
  onIbanChange,
}: {
  step: number;
  stepKey: number;
  selectedBank: { name: string; domain: string } | null;
  onSelectBank: (name: string, domain: string) => void;
  accountName: string;
  balance: string;
  accountType: "COURANT" | "EPARGNE" | "LIVRET" | "INVESTISSEMENT" | "AUTRE";
  currency: "EUR" | "USD" | "GBP" | "CHF";
  iban: string;
  onAccountNameChange: (value: string) => void;
  onBalanceChange: (value: string) => void;
  onAccountTypeChange: (
    value: "COURANT" | "EPARGNE" | "LIVRET" | "INVESTISSEMENT" | "AUTRE"
  ) => void;
  onCurrencyChange: (value: "EUR" | "USD" | "GBP" | "CHF") => void;
  onIbanChange: (value: string) => void;
}) {
  return (
    <div className="px-6 py-4 flex-1 min-h-0 overflow-y-auto">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key={`step-0-${stepKey}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Step1BankSelect
              selectedDomain={selectedBank?.domain ?? ""}
              onSelect={onSelectBank}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Step2AccountDetails
              selectedBank={selectedBank}
              accountName={accountName}
              balance={balance}
              accountType={accountType}
              currency={currency}
              iban={iban}
              onAccountNameChange={onAccountNameChange}
              onBalanceChange={onBalanceChange}
              onAccountTypeChange={onAccountTypeChange}
              onCurrencyChange={onCurrencyChange}
              onIbanChange={onIbanChange}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <Step3Success selectedBank={selectedBank} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
