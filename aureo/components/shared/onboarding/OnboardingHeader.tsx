"use client";

import { Building2, CheckCircle2, Landmark, X } from "lucide-react";

import StepIndicator from "@/components/shared/onboarding/StepIndicator";

type StepTitle = {
  title: string;
  subtitle: string;
  icon: typeof Building2;
};

const STEP_TITLES: StepTitle[] = [
  {
    title: "Choisissez votre banque",
    subtitle: "Pour sécuriser vos comptes",
    icon: Building2,
  },
  {
    title: "Détails du compte",
    subtitle: "Quelques informations essentielles",
    icon: Landmark,
  },
  {
    title: "Compte ajouté",
    subtitle: "Vous êtes prêt",
    icon: CheckCircle2,
  },
];

export default function OnboardingHeader({
  step,
  onClose,
}: {
  step: number;
  onClose: () => void;
}) {
  const current = STEP_TITLES[step] ?? STEP_TITLES[0];
  const Icon = current.icon;

  return (
    <div className="relative px-6 pt-6 pb-4 border-b border-border/20 bg-gradient-to-b from-white/5 to-transparent">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{current.title}</h2>
            <p className="text-xs text-muted-foreground">{current.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Étape {step + 1} / {STEP_TITLES.length}
        </span>
        <StepIndicator current={step} total={STEP_TITLES.length} />
      </div>
    </div>
  );
}
