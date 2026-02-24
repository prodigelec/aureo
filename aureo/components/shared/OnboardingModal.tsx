"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Landmark,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import {
  addBankAccountAction,
  AddBankAccountState,
} from "@/app/accounts/actions";
import { FRENCH_BANKS } from "@/lib/banks";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountType = "CHECKING" | "SAVINGS" | "LIVRET" | "INVESTMENT" | "OTHER";

const ACCOUNT_TYPES: { value: AccountType; label: string; description: string }[] = [
  { value: "CHECKING", label: "Compte courant", description: "Compte du quotidien" },
  { value: "SAVINGS", label: "Compte épargne", description: "Livret, épargne" },
  { value: "LIVRET", label: "Livret réglementé", description: "Livret A, LDDS..." },
  { value: "INVESTMENT", label: "Compte-titres", description: "PEA, CTO, assurance-vie" },
  { value: "OTHER", label: "Autre", description: "Autre type de compte" },
];

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-primary w-6"
              : i === current
              ? "bg-primary w-4"
              : "bg-white/10 w-4"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Bank logo with fallback ──────────────────────────────────────────────────

function BankLogo({
  domain,
  name,
  size = 32,
}: {
  domain: string;
  name: string;
  size?: number;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="flex items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-xs"
        style={{ width: size, height: size }}
      >
        {name[0]}
      </div>
    );
  }

  return (
    <Image
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={size}
      height={size}
      className="rounded-lg object-contain"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

// ─── Step 1 : Choix de la banque ──────────────────────────────────────────────

function Step1BankSelect({
  selectedDomain,
  onSelect,
}: {
  selectedDomain: string;
  onSelect: (name: string, domain: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = FRENCH_BANKS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher votre banque…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
        />
      </div>

      {/* Bank grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
        {filtered.map((bank) => {
          const isSelected = selectedDomain === bank.domain;
          return (
            <button
              key={bank.domain}
              type="button"
              onClick={() => onSelect(bank.name, bank.domain)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left text-sm transition-all duration-150 ${
                isSelected
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border/20 bg-white/3 hover:bg-white/6 hover:border-border/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <BankLogo domain={bank.domain} name={bank.name} size={24} />
              <span className="font-medium truncate">{bank.name}</span>
              {isSelected && (
                <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-primary flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2 : Détails du compte ───────────────────────────────────────────────

function Step2AccountDetails({
  bankName,
  bankDomain,
  errors,
}: {
  bankName: string;
  bankDomain: string;
  errors?: AddBankAccountState["errors"];
}) {
  return (
    <div className="space-y-4">
      {/* Bank recap */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border/20">
        <BankLogo domain={bankDomain} name={bankName} size={28} />
        <div>
          <p className="text-sm font-semibold">{bankName}</p>
          <p className="text-xs text-muted-foreground">Banque sélectionnée</p>
        </div>
      </div>

      {/* Champs cachés */}
      <input type="hidden" name="bankName" value={bankName} />
      <input type="hidden" name="bankDomain" value={bankDomain} />

      {/* Nom du compte */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Nom du compte
        </label>
        <input
          type="text"
          name="accountName"
          placeholder="Ex : Compte principal, Livret A…"
          maxLength={50}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
        />
        {errors?.accountName && (
          <p className="text-xs text-red-400">{errors.accountName}</p>
        )}
      </div>

      {/* Type de compte */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Type de compte
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {ACCOUNT_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border/20 bg-white/3 hover:bg-white/6 cursor-pointer transition-all has-[:checked]:border-primary/50 has-[:checked]:bg-primary/10"
            >
              <input
                type="radio"
                name="accountType"
                value={type.value}
                className="sr-only"
                defaultChecked={type.value === "CHECKING"}
              />
              <span className="text-sm font-medium flex-1">{type.label}</span>
              <span className="text-xs text-muted-foreground">{type.description}</span>
            </label>
          ))}
        </div>
        {errors?.accountType && (
          <p className="text-xs text-red-400">{errors.accountType}</p>
        )}
      </div>

      {/* Solde initial */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Solde actuel (€)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
          <input
            type="number"
            name="balance"
            placeholder="0.00"
            defaultValue="0"
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
          />
        </div>
        {errors?.balance && (
          <p className="text-xs text-red-400">{errors.balance}</p>
        )}
      </div>
    </div>
  );
}

// ─── Step 3 : Succès ──────────────────────────────────────────────────────────

function Step3Success({
  bankName,
  bankDomain,
}: {
  bankName: string;
  bankDomain: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-4 gap-5 text-center">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15 border border-emerald-500/20"
        >
          <BankLogo domain={bankDomain} name={bankName} size={48} />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 12 }}
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
        >
          <CheckCircle2 className="h-4 w-4 text-white" />
        </motion.div>
      </div>

      <div>
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-black"
        >
          Compte ajouté !
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground mt-1 max-w-[240px] mx-auto leading-relaxed"
        >
          Votre compte <strong className="text-foreground">{bankName}</strong> a
          été ajouté avec succès. Vous pouvez maintenant explorer votre tableau
          de bord.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 border border-border/20 rounded-xl px-4 py-2.5"
      >
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>Ajoutez d&apos;autres comptes depuis la section Comptes</span>
      </motion.div>
    </div>
  );
}

// ─── Modal principal ──────────────────────────────────────────────────────────

const initialState: AddBankAccountState = { success: false, message: "" };

export default function OnboardingModal() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(0); // 0 = bank, 1 = details, 2 = success
  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    domain: string;
  } | null>(null);

  const [state, formAction, isPending] = useActionState(
    addBankAccountAction,
    initialState
  );

  // Passer à l'étape succès après soumission réussie
  useEffect(() => {
    if (state.success) {
      setStep(2);
    }
  }, [state]);

  function handleClose() {
    router.refresh();
  }

  const STEP_TITLES = [
    { icon: Building2, title: "Choisissez votre banque", subtitle: "Sélectionnez l'établissement bancaire" },
    { icon: Landmark, title: "Détails du compte", subtitle: "Configurez votre compte" },
    { icon: CheckCircle2, title: "Tout est prêt !", subtitle: "Votre compte a été ajouté" },
  ];

  const currentStep = STEP_TITLES[step];
  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative w-full max-w-md bg-card border border-border/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                <StepIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-base">{currentStep.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>
            {step === 2 && (
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {step < 2 && (
            <div className="mt-4">
              <StepIndicator current={step} total={2} />
            </div>
          )}
        </div>

        {/* Body */}
        <form ref={formRef} action={formAction}>
          <div className="px-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                {step === 0 && (
                  <Step1BankSelect
                    selectedDomain={selectedBank?.domain ?? ""}
                    onSelect={(name, domain) =>
                      setSelectedBank({ name, domain })
                    }
                  />
                )}
                {step === 1 && selectedBank && (
                  <Step2AccountDetails
                    bankName={selectedBank.name}
                    bankDomain={selectedBank.domain}
                    errors={state.errors}
                  />
                )}
                {step === 2 && selectedBank && (
                  <Step3Success
                    bankName={selectedBank.name}
                    bankDomain={selectedBank.domain}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Erreur globale */}
            {!state.success && state.message && step === 1 && (
              <p className="mt-3 text-xs text-red-400 text-center">
                {state.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            {step === 0 && (
              <button
                type="button"
                disabled={!selectedBank}
                onClick={() => setStep(1)}
                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {step === 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Ajout en cours…
                    </>
                  ) : (
                    <>
                      Ajouter le compte
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
              >
                Accéder au tableau de bord
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
