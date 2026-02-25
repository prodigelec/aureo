"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import BankLogo from "@/components/shared/onboarding/BankLogo";

export default function Step3Success({
  selectedBank,
}: {
  selectedBank: { name: string; domain: string } | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <Sparkles className="absolute -right-3 -top-2 h-5 w-5 text-primary/80" />
      </motion.div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold">Compte ajouté</h3>
        <p className="text-sm text-muted-foreground">
          Votre compte est prêt à être utilisé.
        </p>
      </div>

      {selectedBank && (
        <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-white/5 px-4 py-3">
          <BankLogo domain={selectedBank.domain} name={selectedBank.name} size={32} />
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold">{selectedBank.name}</span>
            <span className="text-xs text-muted-foreground">Ajouté avec succès</span>
          </div>
        </div>
      )}
    </div>
  );
}
