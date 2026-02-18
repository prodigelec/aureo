"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, TrendingUp, Shield, Play, ArrowRight, Lightbulb } from "lucide-react";

export function HomeHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const features = [
    { icon: Shield, text: "Gratuit 30 jours" },
    { icon: Sparkles, text: "Sans carte bancaire" },
    { icon: TrendingUp, text: "Données sécurisées" },
  ];

  const stats = [
    { label: "Revenus", value: "3 200 €", color: "green" },
    { label: "Dépenses", value: "1 420 €", color: "orange" },
    { label: "Épargne", value: "1 780 €", color: "blue" },
  ];

  const expenses = [
    { name: "Alimentation", percent: 35, amount: "497 €" },
    { name: "Transport", percent: 25, amount: "355 €" },
    { name: "Loisirs", percent: 20, amount: "284 €" },
    { name: "Autres", percent: 20, amount: "284 €" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 pb-20 pt-16 md:pt-24"
    >
      {/* Animated background gradients */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16"
      >
        {/* Left column - Content */}
        <div className="space-y-8">
          {/* Badge with pulse animation */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex"
          >
            <div className="group relative overflow-hidden rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-foreground">Nouvelle version 2.0 disponible</span>
              </div>
            </div>
          </motion.div>

          {/* Main heading with gradient text */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            Maîtrisez vos{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                finances
              </span>
              
              {/* Underline decoration */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-primary/60 to-transparent"
              />
            </motion.span>
            <br />
            en toute simplicité
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Aureo vous aide à comprendre où va votre argent, à anticiper vos dépenses et à prendre
            de meilleures décisions financières.{" "}
            <span className="font-semibold text-foreground">Sans effort.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="/register"
              className="group relative overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold shadow-2xl shadow-primary/25 transition-all duration-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary to-primary/80" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              
              {/* Glow */}
              <motion.div
                className="absolute inset-0 -z-20 rounded-xl bg-primary blur-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              
              <span className="relative flex items-center gap-2 text-white">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#demo"
              className="group relative overflow-hidden rounded-xl border border-border bg-background px-6 py-3.5 text-base font-semibold transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Voir la démo
                <Play className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          </motion.div>

          {/* Features list */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                    <Icon className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right column - Dashboard Preview */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl"
          />

          {/* Dashboard card */}
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative rounded-3xl border border-border/50 bg-background/80 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Window controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["bg-red-400/80", "bg-yellow-400/80", "bg-green-400/80"].map((color, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      className={`h-3 w-3 rounded-full ${color} cursor-pointer`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground">Dashboard</span>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-muted-foreground"
              >
                Février 2026
              </motion.span>
            </div>

            {/* Main content */}
            <div className="space-y-4 rounded-2xl border border-border/50 bg-gradient-to-br from-background to-primary/5 p-6">
              {/* Net worth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Patrimoine net
                </p>
                
                <motion.p
                  className="mt-1 text-4xl font-bold tracking-tight"
                  initial={{ scale: 0.9 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  4 280,50 €
                </motion.p>

                <motion.div
                  className="mt-2 flex items-center gap-2 text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 }}
                >
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 font-semibold text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +8,2%
                  </span>
                  <span className="text-muted-foreground">vs. mois dernier</span>
                </motion.div>
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`group cursor-pointer rounded-xl border p-3 transition-all ${
                      stat.color === "green"
                        ? "border-green-500/20 bg-green-500/10 hover:border-green-500/30 hover:bg-green-500/15"
                        : stat.color === "orange"
                        ? "border-orange-500/20 bg-orange-500/10 hover:border-orange-500/30 hover:bg-orange-500/15"
                        : "border-blue-500/20 bg-blue-500/10 hover:border-blue-500/30 hover:bg-blue-500/15"
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Expenses breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="rounded-xl border border-border/50 bg-background/80 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Répartition des dépenses
                  </p>
                  <span className="text-[10px] text-muted-foreground">Ce mois</span>
                </div>

                <div className="space-y-3">
                  {expenses.map((cat, index) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.3 + index * 0.1 }}
                    >
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-muted-foreground">{cat.amount}</span>
                      </div>
                      
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${cat.percent}%` } : {}}
                          transition={{ delay: 1.4 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Insight card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                
                <div className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="rounded-lg bg-primary/20 p-2"
                  >
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">
                      Conseil personnalisé
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Vos loisirs représentent 20% de vos dépenses. Réduire de 15% vous ferait
                      économiser <span className="font-semibold text-primary">120 €</span> ce mois.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-4 -top-4 rounded-full bg-primary/20 p-4 backdrop-blur-sm"
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -left-4 rounded-full bg-primary/20 p-4 backdrop-blur-sm"
          >
            <TrendingUp className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-muted-foreground">Défiler pour découvrir</span>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-5 rounded-full border-2 border-primary/30 p-1"
          >
            <div className="h-2 w-1 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
