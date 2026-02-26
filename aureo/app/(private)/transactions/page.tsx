import { redirect } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Calendar, Search, Tag, Wallet } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import SectionCard from "@/components/dashboard/SectionCard";
import EmptyState from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

const formatMoney = (value: number, currency: string) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value);

const categories = [
  "Alimentation",
  "Transport",
  "Logement",
  "Santé",
  "Loisirs",
  "Shopping",
  "Abonnements",
  "Revenus",
  "Épargne",
  "Autres",
];

export default async function TransactionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const accounts = await prisma.bankAccount.findMany({
    where: { userId: user.id, isArchived: false },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, bankName: true, currency: true },
  });

  const transactions: {
    id: string;
    label: string;
    account: string;
    type: "income" | "expense";
    amount: number;
    currency: string;
    date: string;
    category: string;
  }[] = [];

  const hasAccounts = accounts.length > 0;
  const hasTransactions = transactions.length > 0;

  return (
    <main className="flex-1 p-6 lg:p-8 space-y-6">
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Transactions
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">La vue complète</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Consultez toutes vos opérations, filtrez et suivez vos dépenses.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {accounts.length} compte{accounts.length > 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-muted-foreground">
              Mois en cours
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard
            title="Liste des transactions"
            action={
              <span className="text-xs text-muted-foreground">
                {hasTransactions ? `${transactions.length} résultats` : "0 résultat"}
              </span>
            }
          >
            {!hasAccounts ? (
              <EmptyState
                icon={Wallet}
                title="Aucun compte bancaire"
                description="Ajoutez un compte pour commencer à enregistrer vos transactions."
                ctaLabel="Aller aux comptes"
                ctaHref="/accounts"
              />
            ) : (
              <div className="p-5">
                <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-semibold text-muted-foreground border-b border-border/20 pb-3">
                  <span className="col-span-2">Date</span>
                  <span className="col-span-4">Libellé</span>
                  <span className="col-span-2">Compte</span>
                  <span className="col-span-2">Catégorie</span>
                  <span className="col-span-2 text-right">Montant</span>
                </div>
                <div className="divide-y divide-border/10">
                  {!hasTransactions && (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                      Aucune transaction à afficher pour le moment.
                    </div>
                  )}
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                    >
                      <p className="md:col-span-2 text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                      <p className="md:col-span-4 text-sm font-semibold">
                        {transaction.label}
                      </p>
                      <p className="md:col-span-2 text-xs text-muted-foreground">
                        {transaction.account}
                      </p>
                      <p className="md:col-span-2 text-xs text-muted-foreground">
                        {transaction.category}
                      </p>
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                        <span className="text-xs text-muted-foreground md:hidden">
                          {transaction.currency}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            transaction.type === "income"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {formatMoney(transaction.amount, transaction.currency)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {hasTransactions && (
                  <div className="pt-4 text-xs text-muted-foreground">
                    Fin de la liste
                  </div>
                )}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Filtres">
            {!hasAccounts ? (
              <div className="p-5 text-sm text-muted-foreground">
                Ajoutez un compte pour activer les filtres.
              </div>
            ) : (
              <div className="p-5 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher une transaction..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition">
                    <option>Ce mois</option>
                    <option>30 derniers jours</option>
                    <option>90 derniers jours</option>
                    <option>Année en cours</option>
                  </select>
                </div>
                <div className="relative">
                  <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition">
                    <option>Tous les comptes</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} • {account.bankName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition">
                    <option>Toutes catégories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Synthèse">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Dépenses ce mois</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
                  <ArrowDownRight className="h-4 w-4" />
                  0,00 €
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Rentrées ce mois</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />
                  0,00 €
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Catégories suivies</p>
                <p className="text-sm font-semibold">0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Transactions ce mois</p>
                <p className="text-sm font-semibold">0</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
