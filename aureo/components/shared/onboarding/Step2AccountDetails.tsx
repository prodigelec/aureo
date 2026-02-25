"use client";

import BankLogo from "@/components/shared/onboarding/BankLogo";

type AccountType = "COURANT" | "EPARGNE" | "LIVRET" | "INVESTISSEMENT" | "AUTRE";

const ACCOUNT_TYPES: { value: AccountType; label: string; description: string }[] = [
  { value: "COURANT", label: "Compte courant", description: "Compte du quotidien" },
  { value: "EPARGNE", label: "Compte épargne", description: "Livret, épargne" },
  { value: "LIVRET", label: "Livret réglementé", description: "Livret A, LDDS..." },
  { value: "INVESTISSEMENT", label: "Compte-titres", description: "PEA, CTO, assurance-vie" },
  { value: "AUTRE", label: "Autre", description: "Autre type de compte" },
];

export default function Step2AccountDetails({
  selectedBank,
  accountName,
  balance,
  accountType,
  onAccountNameChange,
  onBalanceChange,
  onAccountTypeChange,
}: {
  selectedBank: { name: string; domain: string } | null;
  accountName: string;
  balance: string;
  accountType: AccountType;
  onAccountNameChange: (value: string) => void;
  onBalanceChange: (value: string) => void;
  onAccountTypeChange: (value: AccountType) => void;
}) {
  return (
    <div className="space-y-4">
      {selectedBank && (
        <>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border/20">
            <BankLogo domain={selectedBank.domain} name={selectedBank.name} size={28} />
            <div>
              <p className="text-sm font-semibold">{selectedBank.name}</p>
              <p className="text-xs text-muted-foreground">Banque sélectionnée</p>
            </div>
          </div>
          <input type="hidden" name="bankName" value={selectedBank.name} />
          <input type="hidden" name="bankDomain" value={selectedBank.domain} />
        </>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Nom du compte
        </label>
        <input
          type="text"
          name="accountName"
          placeholder="Ex : Compte principal, Livret A…"
          maxLength={50}
          value={accountName}
          onChange={(event) => onAccountNameChange(event.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
          required
        />
      </div>

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
                checked={accountType === type.value}
                onChange={() => onAccountTypeChange(type.value)}
              />
              <span className="text-sm font-medium flex-1">{type.label}</span>
              <span className="text-xs text-muted-foreground">{type.description}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Solde actuel (€)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            €
          </span>
          <input
            type="text"
            name="balance"
            placeholder="0.00"
            inputMode="decimal"
            value={balance}
            onChange={(event) => onBalanceChange(event.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
            required
          />
        </div>
      </div>
    </div>
  );
}
