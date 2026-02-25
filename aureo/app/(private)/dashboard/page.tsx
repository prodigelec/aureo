import { redirect } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  PiggyBank,
  Plus,
  Receipt,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import OnboardingModal from "@/components/shared/OnboardingModal";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import SectionCard from "@/components/dashboard/SectionCard";
import BudgetBar from "@/components/dashboard/BudgetBar";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const firstName = user.name?.split(" ")[0] ?? "vous";
  const now = new Date();
  const dateLabel = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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

  const formatMoney = (value: number, currency: string) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value);

  const totalsByCurrency = accounts.reduce<Record<string, number>>((acc, account) => {
    const currency = account.currency || "EUR";
    acc[currency] = (acc[currency] ?? 0) + account.balance;
    return acc;
  }, {});

  const totalBalanceCurrencies = Object.entries(totalsByCurrency);
  const hasAccounts = accounts.length > 0;
  const totalBalanceValue = hasAccounts
    ? totalBalanceCurrencies.length === 1
      ? formatMoney(totalBalanceCurrencies[0][1], totalBalanceCurrencies[0][0])
      : "Multi-devises"
    : formatMoney(0, "EUR");
  const totalBalanceSub = hasAccounts
    ? totalBalanceCurrencies.length === 1
      ? "Tous comptes confondus"
      : totalBalanceCurrencies
          .map(([currency, amount]) => formatMoney(amount, currency))
          .join(" • ")
    : "Aucun compte lié";

  const stats = {
    totalBalance: 0,
    monthIncome: 0,
    monthExpenses: 0,
    monthSavings: 0,
  };
  const accountTypeLabels: Record<string, string> = {
    COURANT: "Compte courant",
    EPARGNE: "Compte épargne",
    LIVRET: "Livret réglementé",
    INVESTISSEMENT: "Compte-titres",
    AUTRE: "Autre",
  };
  const hasTransactions = false;
  const hasBudgets = false;

  return (
    <>
      {(!user.onboardingCompleted || !hasAccounts) && <OnboardingModal />}
      <main className="flex-1 p-6 lg:p-8 space-y-8">

      {/* ── En-tête ── */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pl-14 lg:pl-0">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Bonjour, {firstName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 capitalize">
            {dateLabel}
          </p>
        </div>
        <a
          href="/accounts"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Ajouter un compte
        </a>
      </header>

      {/* ── Cartes statistiques ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Solde Total"
          value={totalBalanceValue}
          sub={totalBalanceSub}
          icon={Wallet}
          iconColor="text-primary"
          iconBg="bg-primary/15"
          trend={null}
        />
        <StatCard
          label="Revenus ce mois"
          value={`€ ${stats.monthIncome.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}`}
          sub="Aucune transaction"
          icon={TrendingUp}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/15"
          trend={null}
        />
        <StatCard
          label="Dépenses ce mois"
          value={`€ ${stats.monthExpenses.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}`}
          sub="Aucune transaction"
          icon={TrendingDown}
          iconColor="text-red-400"
          iconBg="bg-red-500/15"
          trend={null}
        />
        <StatCard
          label="Économies ce mois"
          value={`€ ${stats.monthSavings.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}`}
          sub="Aucune transaction"
          icon={PiggyBank}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/15"
          trend={null}
        />
      </section>

      {/* ── Bannière de démarrage ── */}
      {!hasAccounts && (
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-sm">
              Commencez par ajouter vos comptes
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Aureo a besoin de connaître vos comptes bancaires pour analyser
              vos finances et vous donner des recommandations personnalisées.
            </p>
          </div>
          <a
            href="/accounts"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Ajouter un compte
          </a>
        </section>
      )}

      {/* ── Contenu principal ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne gauche — 2/3 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Mes Comptes */}
          <SectionCard
            title="Mes Comptes"
            action={
              <a
                href="/accounts"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </a>
            }
          >
            {!hasAccounts ? (
              <EmptyState
                icon={CreditCard}
                title="Aucun compte bancaire"
                description="Ajoutez vos comptes pour avoir une vue consolidée de vos finances."
                ctaLabel="Ajouter un compte"
                ctaHref="/accounts"
              />
            ) : (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="rounded-xl border border-border/20 bg-white/5 p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                          {(account.bankName || account.name).charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{account.name}</p>
                          <p className="text-xs text-muted-foreground">{account.bankName}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {account.currency}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {accountTypeLabels[account.type]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {account.iban
                            ? `IBAN ••••${account.iban.slice(-4)}`
                            : "IBAN non renseigné"}
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        {formatMoney(account.balance, account.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Budget du mois */}
          <SectionCard
            title="Budget du mois"
            action={
              <a
                href="/budgets"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Gérer →
              </a>
            }
          >
            {!hasBudgets ? (
              <EmptyState
                icon={Target}
                title="Aucun budget défini"
                description="Fixez des limites par catégorie pour mieux contrôler vos dépenses."
                ctaLabel="Créer un budget"
                ctaHref="/budgets"
              />
            ) : (
              <div className="p-5 space-y-4">
                <BudgetBar label="Alimentation" spent={350} total={400} emoji="🍕" />
                <BudgetBar label="Transport" spent={85} total={100} emoji="🚇" />
                <BudgetBar label="Loisirs" spent={280} total={200} emoji="🎬" />
                <BudgetBar label="Abonnements" spent={95} total={100} emoji="📱" />
              </div>
            )}
          </SectionCard>
        </div>

        {/* Colonne droite — 1/3 */}
        <div className="space-y-6">

          {/* Transactions récentes */}
          <SectionCard
            title="Transactions récentes"
            action={
              <a
                href="/transactions"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir tout →
              </a>
            }
          >
            {!hasTransactions ? (
              <EmptyState
                icon={Receipt}
                title="Aucune transaction"
                description="Vos dernières dépenses et revenus apparaîtront ici."
              />
            ) : (
              <div className="divide-y divide-border/20">
                {/* recentTransactions.map(...) — Phase 3 */}
              </div>
            )}
          </SectionCard>

          {/* Aperçu mensuel */}
          <SectionCard title="Aperçu mensuel">
            {!hasTransactions ? (
              <EmptyState
                icon={BarChart3}
                title="Pas encore de données"
                description="La répartition de vos dépenses apparaîtra après vos premières transactions."
              />
            ) : (
              <div className="p-5">{/* chart — Phase 5 */}</div>
            )}
          </SectionCard>
        </div>
      </section>
    </main>
    </>
  );
}
