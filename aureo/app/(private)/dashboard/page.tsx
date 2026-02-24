import { redirect } from "next/navigation";
import {
  ArrowDownRight,
  ArrowUpRight,
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
import OnboardingModal from "@/components/shared/OnboardingModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  trend?: { value: string; positive: boolean } | null;
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card p-5 flex flex-col gap-4 hover:border-border/60 transition-colors">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        {trend ? (
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
              trend.positive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {trend.value}
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground/40 px-2 py-1 rounded-lg bg-white/5">
            Aucune donnée
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-black tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
        <Icon className="h-7 w-7 text-primary/60" />
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary text-xs font-semibold transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

// ─── Section card wrapper ─────────────────────────────────────────────────────

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
        <h2 className="font-bold text-sm">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

// ─── Budget bar ───────────────────────────────────────────────────────────────

function BudgetBar({
  label,
  spent,
  total,
  emoji,
}: {
  label: string;
  spent: number;
  total: number;
  emoji: string;
}) {
  const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  const color =
    pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          <span>{emoji}</span>
          {label}
        </span>
        <span className="text-muted-foreground">
          {spent.toLocaleString("fr-FR")} / {total.toLocaleString("fr-FR")} €
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  // Données financières — seront alimentées par la BDD en Phase 2
  const stats = {
    totalBalance: 0,
    monthIncome: 0,
    monthExpenses: 0,
    monthSavings: 0,
  };

  const hasAccounts = false;
  const hasTransactions = false;
  const hasBudgets = false;

  return (
    <>
      {!user.onboardingCompleted && <OnboardingModal />}
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
          value={`€ ${stats.totalBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}`}
          sub={hasAccounts ? "Tous comptes confondus" : "Aucun compte lié"}
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
              <div className="p-5 grid grid-cols-2 gap-3">
                {/* accounts.map(...) — Phase 2 */}
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
