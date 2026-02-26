"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  ArrowLeftRight,
  Wallet,
  X,
} from "lucide-react";

import { logoutAction } from "@/app/auth/actions";

type User = { id: string; name: string | null; email: string | null };

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, available: true },
  { href: "/accounts", label: "Comptes", icon: Wallet, available: true },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight, available: true },
  { href: "/budgets", label: "Budgets", icon: PieChart, available: false },
  { href: "/reports", label: "Rapports", icon: BarChart3, available: false },
];

function NavContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;

        if (!item.available) {
          return (
            <div
              key={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground/40 cursor-not-allowed select-none"
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
              <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground/50">
                Bientôt
              </span>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{item.label}</span>
            {isActive && (
              <ChevronRight className="h-3 w-3 ml-auto text-primary/60" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarShell({
  user,
  pathname,
  onNavigate,
}: {
  user: User;
  pathname: string;
  onNavigate?: () => void;
}) {
  const initials = (user.name ?? user.email ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border/30 flex-shrink-0">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Image
              src="/logo_aureo.png"
              alt="Aureo"
              width={20}
              height={20}
              priority
            />
          </div>
          <span className="text-lg font-black tracking-tight">Aureo</span>
        </Link>
      </div>

      {/* Navigation */}
      <NavContent pathname={pathname} onNavigate={onNavigate} />

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-border/30 flex-shrink-0 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary text-xs font-bold">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {user.name ?? "Utilisateur"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col bg-card border-r border-border/30">
        <SidebarShell user={user} pathname={pathname} />
      </aside>

      {/* ── Mobile: hamburger button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-card border border-border/30 shadow-lg hover:bg-white/5 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* ── Mobile: overlay sidebar ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-card border-r border-border/30"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <SidebarShell
                user={user}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
