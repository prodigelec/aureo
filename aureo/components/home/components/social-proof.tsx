export function HomeSocialProof() {
  return (
    <section className="border-border bg-primary-soft/20 border-y py-12">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { number: "50K+", label: "Utilisateurs actifs" },
            { number: "2M+", label: "Transactions suivies" },
            { number: "4.9/5", label: "Note moyenne" },
            { number: "98%", label: "Satisfaction client" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight md:text-4xl">{stat.number}</p>
              <p className="text-muted mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
