export function HomeSecurity() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="border-border from-primary-soft/30 to-background grid grid-cols-1 items-center gap-12 rounded-3xl border bg-gradient-to-br p-8 md:grid-cols-2 md:p-16">
          <div className="space-y-6">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Sécurité</p>
            <h2 className="text-4xl font-bold tracking-tight">
              Vos données sont protégées comme dans une banque
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Nous utilisons les mêmes standards de sécurité que les institutions financières pour
              protéger vos informations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Chiffrement AES-256", icon: "🔒" },
                { label: "Authentification 2FA", icon: "🛡️" },
                { label: "Conformité RGPD", icon: "✅" },
                { label: "Hébergement France", icon: "🇫🇷" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-border/50 bg-background/50 flex items-center gap-3 rounded-xl border p-4 backdrop-blur-sm"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-border/50 bg-background/50 rounded-2xl border p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-lg font-semibold">Nos engagements</h3>
            <ul className="space-y-4">
              {[
                "Vos données ne sont jamais vendues à des tiers",
                "Connexion en lecture seule à vos comptes bancaires",
                "Chiffrement de bout en bout de vos informations sensibles",
                "Audits de sécurité réguliers par des experts indépendants",
                "Support réactif en cas de problème",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
