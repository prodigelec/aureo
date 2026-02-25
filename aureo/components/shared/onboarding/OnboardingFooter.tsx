"use client";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

export default function OnboardingFooter({
  step,
  hasSelectedBank,
  isPending,
  canSubmit,
  onBack,
  onContinue,
  onClose,
}: {
  step: number;
  hasSelectedBank: boolean;
  isPending: boolean;
  canSubmit: boolean;
  onBack: () => void;
  onContinue: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border/20 bg-white/5">
      {step === 0 ? (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
        >
          Ignorer
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : step === 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
      ) : (
        <span />
      )}

      {step === 0 ? (
        <button
          type="button"
          onClick={onContinue}
          disabled={!hasSelectedBank}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : step === 1 ? (
        <button
          type="submit"
          disabled={isPending || !canSubmit}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Ajout en cours..." : "Ajouter le compte"}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition"
        >
          Fermer
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
