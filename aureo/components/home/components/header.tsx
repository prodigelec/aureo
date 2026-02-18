"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export function HomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const logoRotate = useTransform(scrollY, [0, 100], [0, 360]);
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Fonctionnalités",
      href: "#features",
      icon: Sparkles,
      description: "Découvrez toutes nos fonctionnalités",
    },
    {
      label: "Comment ça marche",
      href: "#how-it-works",
      icon: TrendingUp,
      description: "Un processus simple et efficace",
    },
    {
      label: "Témoignages",
      href: "#testimonials",
      icon: Shield,
      description: "Ce que nos clients disent",
    },
    {
      label: "Tarifs",
      href: "#pricing",
      icon: Zap,
      description: "Des prix transparents",
    },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity: headerOpacity }}
      className={`group/header sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-border/60 bg-background/98 shadow-2xl shadow-black/5 backdrop-blur-2xl"
          : "border-border/20 bg-background/85 backdrop-blur-xl"
      } `}
    >
      {/* Gradient décoratif top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px">
        <div className="via-primary/60 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
        <div className="via-primary/30 absolute inset-0 animate-pulse bg-linear-to-r from-transparent to-transparent blur-sm" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo Premium avec animations */}
        <motion.a
          href="/"
          className="group/logo flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            style={{ rotate: logoRotate }}
            className="relative flex h-14 w-14 items-center justify-center"
          >
            <Image
              src="/logo_aureo.png"
              alt="Aureo"
              width={40}
              height={40}
              priority
              className="relative z-10 drop-shadow-lg"
            />
          </motion.div>

          <div className="flex flex-col">
            <span className="from-foreground via-foreground to-foreground/70 bg-linear-to-r bg-clip-text text-xl font-black tracking-tight text-transparent">
              Aureo
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              Gestion financière
            </span>
          </div>
        </motion.a>

        {/* Navigation Premium avec mega hover */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.href;

            return (
              <motion.div
                key={item.href}
                className="relative"
                onHoverStart={() => setHoveredItem(item.href)}
                onHoverEnd={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <a
                  href={item.href}
                  className="group/navitem text-muted-foreground hover:text-foreground relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300"
                >
                  <Icon className="group-hover/navitem:text-primary h-4 w-4 transition-transform duration-300 group-hover/navitem:scale-110" />
                  {item.label}

                  {/* Underline animé */}
                  <motion.span
                    className="from-primary via-primary/80 to-primary absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-linear-to-r"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "70%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>

                {/* Tooltip Premium au hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <div className="border-border/60 bg-background/95 rounded-lg border px-3 py-2 shadow-xl backdrop-blur-xl">
                        <p className="text-muted-foreground text-xs">{item.description}</p>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="border-border/60 bg-background/95 h-2 w-2 rotate-45 border-t border-l" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        {/* CTAs Premium */}
        <div className="flex items-center gap-3">
          {/* Bouton Connexion Premium */}
          <motion.a
            href="/login"
            className="group/login relative hidden overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 md:block"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Background layers */}
            <div className="bg-muted/30 group-hover/login:bg-muted/50 absolute inset-0 -z-10 rounded-xl transition-all duration-300" />
            <div className="ring-primary/30 absolute inset-0 -z-10 rounded-xl opacity-0 ring-2 transition-all duration-300 ring-inset group-hover/login:opacity-100" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 -z-10 translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/login:translate-x-full" />

            <span className="text-foreground relative">Connexion</span>
          </motion.a>

          {/* Bouton CTA Ultra Premium */}
          <motion.a
            href="/register"
            className="group/cta shadow-primary/25 hover:shadow-3xl hover:shadow-primary/40 relative overflow-hidden rounded-xl px-6 py-2.5 text-sm font-black shadow-2xl transition-all duration-500"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          >
            {/* Gradient animé en fond */}
            <motion.div
              className="from-primary via-primary to-primary/80 absolute inset-0 -z-10 bg-linear-to-r"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            {/* Shimmer premium */}
            <div className="absolute inset-0 -z-10 translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />

            {/* Glow pulsé */}
            <motion.div
              className="bg-primary absolute inset-0 -z-20 rounded-xl blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Border glow */}
            <div className="absolute inset-0 -z-10 rounded-xl opacity-0 ring-2 ring-white/30 transition-opacity duration-300 group-hover/cta:opacity-100" />

            <span className="relative flex items-center gap-2 text-white drop-shadow-lg">
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-12" />
              Essai gratuit
              {/* Flèche avec bounce */}
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.a>
        </div>
      </div>

      {/* Progress bar au scroll */}
      <motion.div
        className="from-primary via-primary/80 to-primary shadow-primary/50 absolute bottom-0 left-0 h-1 bg-linear-to-r shadow-lg"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          transformOrigin: "left",
        }}
      />

      {/* Gradient décoratif bottom */}
      <div className="via-primary/20 pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </motion.header>
  );
}
