import { redirect } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import SectionCard from "@/components/dashboard/SectionCard";
import EmptyState from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

const accountTypeLabels: Record<string, string> = {
  COURANT: "Compte courant",
  EPARGNE: "Compte épargne",
  LIVRET: "Livret réglementé",
  INVESTISSEMENT: "Compte-titres",
  AUTRE: "Autre",
};

const formatMoney = (value: number, currency: string) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value);

export default async function AccountsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const accounts = await prisma.bankAccount.findMany({
    where: { userId: user.id, isArchived: false },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      bankName: true,
      type: true,
      balance: true,
      currency: true,
      iban: true,
    },
  });

  const hasAccounts = accounts.length > 0;
  const totalsByCurrency = accounts.reduce<Record<string, number>>((acc, account) => {
    const currency = account.currency || "EUR";
    acc[currency] = (acc[currency] ?? 0) + account.balance;
    return acc;
  }, {});
  const movements: {
    id: string;
    label: string;
    account: string;
    type: "income" | "expense";
    amount: number;
    currency: string;
    date: string;
  }[] = [];
  const hasMovements = movements.length > 0;

  return (
    <main className="flex-1 p-6 lg:p-8 space-y-6">
      <section className="rounded-3xl border border-border/30 bg-gradient-to-br from-primary/15 via-background to-background p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Comptes
            </p>
            <h1 className="text-3xl font-black tracking-tight mt-2">
              Suivi des dépenses et des rentrées
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Gardez un œil sur vos mouvements et l’état global de vos comptes.
            </p>
          </div>
        
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border/20 bg-white/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Comptes actifs</p>
            <p className="text-2xl font-black mt-2">{accounts.length}</p>
          </div>
          <div className="rounded-2xl border border-border/20 bg-white/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Totaux par devise</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(totalsByCurrency).map(([currency, amount]) => (
                <span
                  key={currency}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary"
                >
                  {formatMoney(amount, currency)}
                </span>
              ))}
              {!hasAccounts && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-muted-foreground">
                  Aucun solde
                </span>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-border/20 bg-white/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Dernière dépense</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-400">
              <ArrowDownRight className="h-4 w-4" />
              0,00 €
            </div>
          </div>
          <div className="rounded-2xl border border-border/20 bg-white/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Dernière rentrée</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
              0,00 €
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="Tableau des mouvements">
        {!hasAccounts ? (
          <EmptyState
            icon={Wallet}
            title="Aucun compte bancaire"
            description="Ajoutez un compte depuis le dashboard pour afficher vos mouvements."
            ctaLabel="Aller au dashboard"
            ctaHref="/dashboard"
          />
        ) : (
          <div className="p-5">
            <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-semibold text-muted-foreground border-b border-border/20 pb-3">
              <span className="col-span-2">Date</span>
              <span className="col-span-4">Libellé</span>
              <span className="col-span-3">Compte</span>
              <span className="col-span-1">Type</span>
              <span className="col-span-2 text-right">Montant</span>
            </div>
            <div className="divide-y divide-border/10">
              {!hasMovements && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Aucun mouvement à afficher pour le moment.
                </div>
              )}
              {movements.map((movement) => (
                <div
                  key={movement.id}
                  className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                >
                  <p className="md:col-span-2 text-xs text-muted-foreground">
                    {movement.date}
                  </p>
                  <p className="md:col-span-4 text-sm font-semibold">
                    {movement.label}
                  </p>
                  <p className="md:col-span-3 text-xs text-muted-foreground">
                    {movement.account}
                  </p>
                  <div className="md:col-span-1 flex items-center gap-2 text-xs font-semibold">
                    {movement.type === "income" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <ArrowUpRight className="h-4 w-4" />
                        Entrée
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400">
                        <ArrowDownRight className="h-4 w-4" />
                        Dépense
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                    <span className="text-xs text-muted-foreground md:hidden">
                      {movement.currency}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        movement.type === "income" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {formatMoney(movement.amount, movement.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionCard>
    </main>
  );
}
