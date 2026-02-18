"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Link2, TrendingUp, ArrowRight, Check, Sparkles } from "lucide-react";

export function HomeHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Créez votre compte",
      description:
        "Inscrivez-vous gratuitement en moins de 2 minutes. Aucune carte bancaire requise pour l'essai.",
      gradient: "from-blue-500 to-cyan-500",
      highlights: ["Gratuit", "Sans CB", "2 minutes"],
    },
    {
      step: "02",
      icon: Link2,
      title: "Connectez vos comptes",
      description:
        "Liez vos comptes bancaires en toute sécurité. Synchronisation automatique de vos transactions.",
      gradient: "from-purple-500 to-pink-500",
      highlights: ["Sécurisé", "Auto sync", "500+ banques"],
    },
    {
      step: "03",
      icon: TrendingUp,
      title: "Pilotez vos finances",
      description:
        "Visualisez, analysez et optimisez vos dépenses avec des conseils personnalisés.",
      gradient: "from-green-500 to-emerald-500",
      highlights: ["IA conseils", "Temps réel", "Rapports"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-6 py-32"
      ref={ref}
    >
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Decorative elements */}
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
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="mb-6 inline-flex"
          >
            <div className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                Simplicité
              </p>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-5xl font-black tracking-tight md:text-6xl"
          >
            Comment ça{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              marche ?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            En 3 étapes simples, commencez à maîtriser vos finances
          </motion.p>
        </motion.div>

        {/* Steps with connecting lines */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 top-24 hidden h-0.5 w-full md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full w-full origin-left bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="group relative"
              >
                {/* Large step number background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                  className="pointer-events-none absolute -left-4 -top-8 select-none text-9xl font-black text-primary/5"
                >
                  {step.step}
                </motion.div>

                {/* Main card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background p-8 shadow-xl transition-all duration-500 hover:border-transparent hover:shadow-2xl"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                  />

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-from), transparent)`,
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon badge */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="mb-6 inline-flex"
                    >
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl`}
                      >
                        <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>

                    {/* Step number badge */}
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${step.gradient} text-sm font-bold text-white`}
                      >
                        {step.step}
                      </span>
                      
                      {/* Checkmark indicator */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10"
                      >
                        <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((highlight) => (
                        <motion.span
                          key={highlight}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          <Sparkles className="h-3 w-3" />
                          {highlight}
                        </motion.span>
                      ))}
                    </div>

                    {/* Arrow to next step (not on last) */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.5 + index * 0.2 }}
                        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block"
                      >
                        <motion.div
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm"
                        >
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-transform duration-500 group-hover:translate-x-8 group-hover:-translate-y-8" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="/register"
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary via-purple-600 to-primary px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 transition-all duration-500 hover:shadow-3xl hover:shadow-primary/40"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Commencer maintenant</span>
            
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.a>

          <p className="mt-4 text-sm text-muted-foreground">
            ✓ Gratuit pendant 30 jours • ✓ Sans carte bancaire • ✓ 2 minutes chrono
          </p>
        </motion.div>
      </div>
    </section>
  );
}
