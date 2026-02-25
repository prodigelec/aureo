"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Search } from "lucide-react";

import BankLogo from "@/components/shared/onboarding/BankLogo";

type BankResult = { name: string; domain: string };

const DEFAULT_BANKS: BankResult[] = [
  { name: "BNP Paribas", domain: "bnpparibas.com" },
  { name: "Crédit Agricole", domain: "credit-agricole.fr" },
  { name: "Société Générale", domain: "societegenerale.fr" },
  { name: "Boursorama", domain: "boursorama.com" },
  { name: "LCL", domain: "lcl.fr" },
  { name: "Caisse d'Épargne", domain: "caisse-epargne.fr" },
  { name: "Revolut", domain: "revolut.com" },
  { name: "N26", domain: "n26.com" },
  { name: "Fortuneo", domain: "fortuneo.fr" },
  { name: "Hello bank!", domain: "hellobank.fr" },
];

export default function Step1BankSelect({
  selectedDomain,
  onSelect,
}: {
  selectedDomain: string;
  onSelect: (name: string, domain: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BankResult[]>(DEFAULT_BANKS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(DEFAULT_BANKS);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
            query
          )}`
        );
        const data: { name: string; domain: string }[] = await res.json();
        setResults(data.slice(0, 12).map((d) => ({ name: d.name, domain: d.domain })));
      } catch {
        setResults(DEFAULT_BANKS);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher votre banque…"
          value={query}
          onChange={(e) => {
            const raw = e.target.value;
            const next = raw ? raw[0].toUpperCase() + raw.slice(1) : raw;
            setQuery(next);
          }}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {query.trim().length < 2
          ? "Banques populaires"
          : `${results.length} résultat${results.length > 1 ? "s" : ""}`}
      </p>

      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
        {results.map((bank) => {
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

        {!loading && results.length === 0 && (
          <p className="col-span-2 text-center text-xs text-muted-foreground py-6">
            Aucun résultat pour &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
