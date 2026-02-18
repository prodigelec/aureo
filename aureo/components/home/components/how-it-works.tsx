export function HomeHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="from-primary-soft/20 to-background bg-gradient-to-b px-6 py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Simplicité</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Comment ça marche ?
          </h2>
          <p className="text-muted mt-4 text-lg">
            En 3 étapes simples, commencez à maîtriser vos finances
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Créez votre compte",
              description:
                "Inscrivez-vous gratuitement en moins de 2 minutes. Aucune carte bancaire requise pour l'essai.",
            },
            {
              step: "02",
              title: "Connectez vos comptes",
              description:
                "Liez vos comptes bancaires en toute sécurité. Synchronisation automatique de vos transactions.",
            },
            {
              step: "03",
              title: "Pilotez vos finances",
              description:
                "Visualisez, analysez et optimisez vos dépenses avec des conseils personnalisés.",
            },
          ].map((step) => (
            <div key={step.step} className="relative">
              <div className="text-primary/10 absolute -top-4 -left-4 text-8xl font-bold">
                {step.step}
              </div>
              <div className="border-border bg-background relative rounded-2xl border p-8">
                <div className="from-primary to-primary/60 text-foreground mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
