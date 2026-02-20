"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, LogIn } from "lucide-react";
import BrandingContent from "@/app/register/components/BrandingContent";
import TrustBadges from "@/app/register/components/TrustBadges";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
    const features = [
        { icon: LogIn, text: "Accès sécurisé" },
        { icon: Shield, text: "Protection de vos données" },
        { icon: Sparkles, text: "Gestion simplifiée" },
    ];

    return (
        <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background" />

                {/* Floating orbs */}
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
                    className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl"
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
                        delay: 2,
                    }}
                    className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/15 to-cyan-500/15 blur-3xl"
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-4 md:px-6 md:py-6 lg:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-5xl"
                >
                    {/* Main Card */}
                    <motion.div
                        whileHover={{ scale: 1.002 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="overflow-hidden rounded-3xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Column: Branding & Info (Hidden on Mobile) */}
                            <BrandingContent features={features} />

                            {/* Right Column: Form */}
                            <LoginForm />
                        </div>
                    </motion.div>

                    {/* Bottom Badges */}
                    <TrustBadges />
                </motion.div>
            </div>
        </main>
    );
}
