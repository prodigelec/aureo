import Image from "next/image";
import Link from "next/link";

import { registerAction } from "@/app/auth/actions";

type RegisterPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const errorMessage = searchParams?.error;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="relative min-h-screen overflow-hidden">
        <div className="from-primary-soft/20 to-background absolute inset-0 bg-gradient-to-br" />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
          <div className="border-border/60 bg-background/80 w-full max-w-lg rounded-3xl border p-8 shadow-xl backdrop-blur md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="from-primary to-primary/60 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br">
                <Image src="/logo_aureo.png" alt="Aureo" width={28} height={28} priority />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold">Aureo</span>
                <span className="text-muted text-xs">Créer un compte</span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Commencer gratuitement</h1>
              <p className="text-muted text-sm">
                Profitez de 30 jours gratuits pour découvrir Aureo.
              </p>
            </div>

            {errorMessage ? (
              <div className="border-red-500/20 bg-red-500/10 text-red-200 mt-6 rounded-2xl border px-4 py-3 text-sm">
                {errorMessage}
              </div>
            ) : null}

            <form action={registerAction} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Nom complet
                </label>
                <input
                  className="border-border bg-background/60 focus:border-primary focus:ring-primary/30 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                  id="name"
                  name="name"
                  placeholder="Jean Dupont"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="border-border bg-background/60 focus:border-primary focus:ring-primary/30 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                  id="email"
                  name="email"
                  placeholder="jean@example.com"
                  required
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  className="border-border bg-background/60 focus:border-primary focus:ring-primary/30 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>

              <button
                className="from-primary to-primary/80 text-foreground shadow-primary/20 hover:shadow-primary/30 w-full rounded-xl bg-linear-to-r px-6 py-3.5 text-sm font-semibold shadow-lg transition hover:shadow-xl"
                type="submit"
              >
                Créer mon compte
              </button>
            </form>

            <p className="text-muted mt-6 text-center text-sm">
              Déjà un compte ?{" "}
              <Link className="text-foreground hover:text-primary font-semibold" href="/login">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
