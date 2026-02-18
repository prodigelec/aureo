export function HomeTestimonials() {
  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            Témoignages
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Ils ont repris le contrôle
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Marie L.",
              role: "Freelance designer",
              content:
                "Aureo m'a permis de voir clairement où partait mon argent. J'ai économisé 400€ le premier mois en identifiant mes dépenses inutiles.",
              rating: 5,
            },
            {
              name: "Thomas B.",
              role: "Ingénieur",
              content:
                "Interface intuitive et conseils pertinents. La catégorisation automatique fonctionne parfaitement et me fait gagner un temps fou.",
              rating: 5,
            },
            {
              name: "Sophie M.",
              role: "Professeure",
              content:
                "Enfin un outil qui explique mes finances simplement ! Les rapports mensuels m'aident à mieux planifier mon budget.",
              rating: 5,
            },
          ].map((testimonial) => (
            <div
              key={testimonial.name}
              className="border-border bg-background hover:border-primary/50 rounded-2xl border p-6 transition hover:shadow-lg"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <svg
                    key={index}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted leading-relaxed">{testimonial.content}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="from-primary to-primary/60 text-foreground flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
