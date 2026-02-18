import Image from "next/image";

export function HomeHeader() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="from-primary to-primary/60 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
            <Image src="/logo_aureo.png" alt="Aureo" width={24} height={24} priority />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">Aureo</span>
            <span className="text-muted text-[10px] tracking-wider uppercase">
              Gestion financière
            </span>
          </div>
        </div>
        <nav className="text-muted hidden items-center gap-8 text-sm font-medium md:flex">
          <a className="hover:text-foreground transition" href="#features">
            Fonctionnalités
          </a>
          <a className="hover:text-foreground transition" href="#how-it-works">
            Comment ça marche
          </a>
          <a className="hover:text-foreground transition" href="#testimonials">
            Témoignages
          </a>
          <a className="hover:text-foreground transition" href="#pricing">
            Tarifs
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="text-foreground hover:bg-primary-soft hidden rounded-xl px-4 py-2 text-sm font-medium transition md:block"
            href="/login"
          >
            Connexion
          </a>
          <a
            className="from-primary to-primary/80 text-foreground shadow-primary/20 hover:shadow-primary/30 rounded-xl bg-linear-to-r px-5 py-2 text-sm font-semibold shadow-lg transition hover:shadow-xl"
            href="/register"
          >
            Essai gratuit
          </a>
        </div>
      </div>
    </header>
  );
}
