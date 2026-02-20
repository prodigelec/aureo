"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Check, LucideIcon } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    text: string;
}

interface BrandingContentProps {
    features: Feature[];
}

export default function BrandingContent({ features }: BrandingContentProps) {
    return (
        <div className="relative hidden flex-col justify-between bg-zinc-900/40 p-10 md:flex lg:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

            <div className="space-y-10">
                {/* Logo & Brand */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                >
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30"
                    >
                        <Image src="/logo_aureo.png" alt="Aureo" width={28} height={28} priority />
                    </motion.div>

                    <div className="flex flex-col leading-tight">
                        <span className="text-xl font-bold">Aureo</span>
                        <span className="text-xs text-muted-foreground">La plateforme intelligente</span>
                    </div>
                </motion.div>

                {/* Header Title */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-black tracking-tight lg:text-4xl"
                    >
                        Commencer{" "}
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            gratuitement
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-muted-foreground max-w-xs leading-relaxed"
                    >
                        Optimisez votre activité avec nos outils innovants. 30 jours pour explorer sans limite.
                    </motion.p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.text}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-foreground/80">{feature.text}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Trust Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-6 pt-10 border-t border-border/50"
            >
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">SSL Sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Conforme RGPD</span>
                </div>
            </motion.div>
        </div>
    );
}
