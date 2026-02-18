"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CreditCard,
  Target,
  BarChart3,
  Brain,
  Bell,
  Gift,
  Smartphone,
  Shield,
  TrendingUp,
} from "lucide-react";

export function HomeFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: CreditCard,
      title: "Comptes synchronisés",
      description:
        "Connectez tous vos comptes bancaires et cartes en quelques clics. Synchronisation automatique et sécurisée.",
      gradient: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: Target,
      title: "Budgets intelligents",
      description:
        "Créez des budgets par catégorie avec alertes automatiques dès que vous approchez de vos limites.",
      gradient: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: BarChart3,
      title: "Analyses détaillées",
      description:
        "Visualisez vos habitudes de dépenses avec des graphiques clairs et des rapports mensuels.",
      gradient: "from-green-500 to-emerald-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
    },
    {
      icon: Brain,
      title: "Catégorisation auto",
      description:
        "L'IA classe automatiquement vos transactions et apprend de vos corrections.",
      gradient: "from-orange-500 to-amber-500",
      glowColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: Bell,
      title: "Alertes personnalisées",
      description:
        "Recevez des notifications pour les dépenses inhabituelles, les échéances et les opportunités d'économies.",
      gradient: "from-red-500 to-rose-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: Gift,
      title: "Conseils sur mesure",
      description:
        "Obtenez des recommandations adaptées à votre situation pour optimiser votre épargne.",
      gradient: "from-violet-500 to-purple-500",
      glowColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: Smartphone,
      title: "Application mobile",
      description: "Accédez à vos finances n'importe où avec nos apps iOS et Android.",
      gradient: "from-indigo-500 to-blue-500",
      glowColor: "rgba(99, 102, 241, 0.5)",
    },
    {
      icon: Shield,
      title: "Sécurité bancaire",
      description: "Chiffrement AES-256, authentification 2FA et conformité RGPD garantie.",
      gradient: "from-teal-500 to-cyan-500",
      glowColor: "rgba(20, 184, 166, 0.5)",
    },
    {
      icon: TrendingUp,
      title: "Objectifs d'épargne",
      description:
        "Définissez vos projets et suivez votre progression avec des visualisations motivantes.",
      gradient: "from-lime-500 to-green-500",
      glowColor: "rgba(132, 204, 22, 0.5)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="features" className="relative overflow-hidden px-6 py-32" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <div className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                Fonctionnalités
              </p>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black tracking-tight md:text-6xl"
          >
            Tout ce dont vous avez{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              besoin
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-muted-foreground"
          >
            Des outils puissants, une interface intuitive
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-transparent hover:shadow-2xl">
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${feature.glowColor} 0%, transparent 100%)`,
                    }}
                  />

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{
                      background: `linear-gradient(135deg, ${feature.glowColor}, transparent)`,
                    }}
                    animate={{
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="mb-6 inline-flex"
                    >
                      <div
                        className={`rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-xl`}
                        style={{
                          boxShadow: `0 10px 40px -10px ${feature.glowColor}`,
                        }}
                      >
                        <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>

                    {/* Animated arrow on hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span>En savoir plus</span>
                      <motion.svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-transform duration-500 group-hover:translate-x-8 group-hover:-translate-y-8" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="mb-6 text-lg text-muted-foreground">
            Et bien plus encore à découvrir...
          </p>

          <motion.a
            href="/features"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-primary/5 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir toutes les fonctionnalités</span>
            <motion.svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
