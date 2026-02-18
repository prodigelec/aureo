export function HomeFinalCta() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="border-border from-primary-soft/50 to-primary-soft/20 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-12 text-center md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
          <div className="relative space-y-6">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Prêt à reprendre le contrôle ?
            </h2>
            <p className="text-muted mx-auto max-w-2xl text-lg">
              Rejoignez 50 000+ utilisateurs qui ont transformé leur relation avec l&#39argent grâce
              à Aureo.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="group from-primary to-primary/80 text-foreground shadow-primary/20 hover:shadow-primary/30 rounded-xl bg-linear-to-r px-8 py-4 text-base font-semibold shadow-lg transition hover:shadow-xl"
                href="/register"
              >
                Commencer gratuitement
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </a>
              <a
                className="border-border bg-background text-foreground hover:bg-primary-soft rounded-xl border px-8 py-4 text-base font-semibold transition"
                href="#features"
              >
                En savoir plus
              </a>
            </div>
            <p className="text-muted text-sm">
              30 jours gratuits · Sans carte bancaire · Annulation facile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
