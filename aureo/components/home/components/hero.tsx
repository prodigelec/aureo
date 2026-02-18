export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24">
      <div className="from-primary-soft/30 to-background absolute inset-0 -z-10 bg-linear-to-b" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <div className="border-primary/20 bg-primary-soft/50 text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Nouvelle version 2.0 disponible
          </div>

          <h1 className="text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl">
            Maîtrisez vos
            <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
              {" "}
              finances
            </span>
            <br />
            en toute simplicité
          </h1>

          <p className="text-muted text-lg leading-relaxed md:text-xl">
            Aureo vous aide à comprendre où va votre argent, à anticiper vos dépenses et à prendre
            de meilleures décisions financières. Sans effort.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="group from-primary to-primary/80 text-foreground shadow-primary/20 hover:shadow-primary/30 rounded-xl bg-linear-to-r px-6 py-3.5 text-base font-semibold shadow-lg transition hover:shadow-xl"
              href="/register"
            >
              Commencer gratuitement
              <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
            </a>
            <a
              className="group border-border bg-background text-foreground hover:bg-primary-soft rounded-xl border px-6 py-3.5 text-base font-semibold transition"
              href="#demo"
            >
              Voir la démo
              <span className="ml-2 inline-block transition group-hover:translate-x-1">▶</span>
            </a>
          </div>

          <div className="text-muted flex flex-wrap items-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Gratuit 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sans carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="from-primary/20 to-primary/10 absolute -inset-4 rounded-3xl bg-linear-to-r opacity-50 blur-2xl" />
          <div className="border-border/50 bg-background/50 relative rounded-3xl border p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-muted text-xs font-medium">Dashboard</span>
              </div>
              <span className="text-muted text-xs">Février 2026</span>
            </div>

            <div className="border-border/50 from-background to-primary-soft/20 space-y-4 rounded-2xl border bg-gradient-to-br p-6">
              <div>
                <p className="text-muted text-xs font-medium tracking-wider uppercase">
                  Patrimoine net
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight">4 280,50 €</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-green-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    +8,2%
                  </span>
                  <span className="text-muted">vs. mois dernier</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Revenus",
                    value: "3 200 €",
                    color: "bg-green-500/10 border-green-500/20",
                  },
                  {
                    label: "Dépenses",
                    value: "1 420 €",
                    color: "bg-orange-500/10 border-orange-500/20",
                  },
                  {
                    label: "Épargne",
                    value: "1 780 €",
                    color: "bg-blue-500/10 border-blue-500/20",
                  },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl border p-3 ${item.color}`}>
                    <p className="text-muted text-[10px] font-medium tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-border/50 bg-background/80 rounded-xl border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-muted text-xs font-medium">Répartition des dépenses</p>
                  <span className="text-muted text-[10px]">Ce mois</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Alimentation", percent: 35, amount: "497 €" },
                    { name: "Transport", percent: 25, amount: "355 €" },
                    { name: "Loisirs", percent: 20, amount: "284 €" },
                    { name: "Autres", percent: 20, amount: "284 €" },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-muted">{cat.amount}</span>
                      </div>
                      <div className="bg-primary-soft/40 h-1.5 w-full overflow-hidden rounded-full">
                        <div
                          className="from-primary to-primary/60 h-full rounded-full bg-gradient-to-r"
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-primary/20 bg-primary-soft/30 rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-lg p-2">
                    <svg className="text-primary h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-xs font-semibold">Conseil personnalisé</p>
                    <p className="text-muted mt-1 text-xs leading-relaxed">
                      Vos loisirs représentent 20% de vos dépenses. Réduire de 15% vous ferait
                      économiser 120 € ce mois.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
