import Image from "next/image";

export function HomeFooter() {
  return (
    <footer className="border-border bg-primary-soft/10 border-t py-12">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="from-primary to-primary/60 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                <Image src="/logo_aureo.png" alt="Aureo" width={24} height={24} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold">Aureo</span>
                <span className="text-muted text-xs">Gestion financière</span>
              </div>
            </div>
            <p className="text-muted mt-4 text-sm">
              Reprenez le contrôle de vos finances en toute simplicité.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Produit</h4>
            <ul className="text-muted space-y-2 text-sm">
              <li>
                <a className="hover:text-foreground transition" href="#features">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="#pricing">
                  Tarifs
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="#testimonials">
                  Témoignages
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Entreprise</h4>
            <ul className="text-muted space-y-2 text-sm">
              <li>
                <a className="hover:text-foreground transition" href="/about">
                  À propos
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/blog">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/careers">
                  Carrières
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Légal</h4>
            <ul className="text-muted space-y-2 text-sm">
              <li>
                <a className="hover:text-foreground transition" href="/privacy">
                  Confidentialité
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/terms">
                  CGU
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition" href="/security">
                  Sécurité
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-border text-muted mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm md:flex-row">
          <p>© 2026 Aureo. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a className="hover:text-foreground transition" href="#">
              Twitter
            </a>
            <a className="hover:text-foreground transition" href="#">
              LinkedIn
            </a>
            <a className="hover:text-foreground transition" href="#">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
