export function HomeFeatures() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            Fonctionnalités
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted mt-4 text-lg">Des outils puissants, une interface intuitive</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "💳",
              title: "Comptes synchronisés",
              description:
                "Connectez tous vos comptes bancaires et cartes en quelques clics. Synchronisation automatique et sécurisée.",
            },
            {
              icon: "🎯",
              title: "Budgets intelligents",
              description:
                "Créez des budgets par catégorie avec alertes automatiques dès que vous approchez de vos limites.",
            },
            {
              icon: "📊",
              title: "Analyses détaillées",
              description:
                "Visualisez vos habitudes de dépenses avec des graphiques clairs et des rapports mensuels.",
            },
            {
              icon: "🤖",
              title: "Catégorisation auto",
              description:
                "L'IA classe automatiquement vos transactions et apprend de vos corrections.",
            },
            {
              icon: "🔔",
              title: "Alertes personnalisées",
              description:
                "Recevez des notifications pour les dépenses inhabituelles, les échéances et les opportunités d'économies.",
            },
            {
              icon: "🎁",
              title: "Conseils sur mesure",
              description:
                "Obtenez des recommandations adaptées à votre situation pour optimiser votre épargne.",
            },
            {
              icon: "📱",
              title: "Application mobile",
              description: "Accédez à vos finances n'importe où avec nos apps iOS et Android.",
            },
            {
              icon: "🔒",
              title: "Sécurité bancaire",
              description: "Chiffrement AES-256, authentification 2FA et conformité RGPD garantie.",
            },
            {
              icon: "📈",
              title: "Objectifs d'épargne",
              description:
                "Définissez vos projets et suivez votre progression avec des visualisations motivantes.",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="group border-border bg-background hover:border-primary/50 hover:shadow-primary/5 relative rounded-2xl border p-6 transition hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
