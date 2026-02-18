export function HomePricing() {
  return (
    <section
      id="pricing"
      className="from-background to-primary-soft/20 bg-gradient-to-b px-6 py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Tarifs</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Simple et transparent
          </h2>
          <p className="text-muted mt-4 text-lg">
            Commencez gratuitement, passez premium quand vous voulez
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: "Gratuit",
              price: "0€",
              period: "pour toujours",
              description: "Pour découvrir Aureo",
              features: [
                "1 compte bancaire",
                "Catégorisation manuelle",
                "Rapports basiques",
                "Application mobile",
              ],
              cta: "Commencer",
              highlighted: false,
            },
            {
              name: "Premium",
              price: "4,99€",
              period: "/mois",
              description: "Pour optimiser vos finances",
              features: [
                "Comptes illimités",
                "Catégorisation automatique",
                "Budgets avancés",
                "Analyses détaillées",
                "Alertes personnalisées",
                "Export de données",
                "Support prioritaire",
              ],
              cta: "Essayer 30 jours gratuits",
              highlighted: true,
              badge: "Le plus populaire",
            },
            {
              name: "Famille",
              price: "8,99€",
              period: "/mois",
              description: "Pour gérer en couple ou en famille",
              features: [
                "Tout Premium +",
                "Jusqu'à 5 profils",
                "Comptes partagés",
                "Budgets familiaux",
                "Objectifs communs",
              ],
              cta: "Essayer 30 jours gratuits",
              highlighted: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition hover:shadow-xl ${
                plan.highlighted
                  ? "border-primary from-primary-soft/50 to-background shadow-primary/10 bg-gradient-to-b shadow-xl"
                  : "border-border bg-background"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="from-primary to-primary/80 text-foreground rounded-full bg-gradient-to-r px-4 py-1 text-xs font-semibold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-muted mt-2 text-sm">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-muted">{plan.period}</span>
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="text-primary mt-0.5 h-5 w-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`mt-8 block rounded-xl px-6 py-3 text-center font-semibold transition ${
                  plan.highlighted
                    ? "from-primary to-primary/80 text-foreground shadow-primary/20 hover:shadow-primary/30 bg-gradient-to-r shadow-lg hover:shadow-xl"
                    : "border-border bg-background text-foreground hover:bg-primary-soft border"
                }`}
                href="/register"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-muted mt-12 text-center text-sm">
          Tous les plans incluent un essai gratuit de 30 jours. Aucune carte bancaire requise.
        </p>
      </div>
    </section>
  );
}
