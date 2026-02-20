"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
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

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg text-center"
                >
                    {/* Main Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/50 bg-background/95 p-10 shadow-2xl backdrop-blur-xl md:p-14"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [-10, 10, 0] }}
                            transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                            className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                        >
                            <SearchX className="h-10 w-10 text-primary" />
                        </motion.div>

                        <h1 className="mb-2 text-6xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            404
                        </h1>

                        <h2 className="mb-4 text-2xl font-bold">Page introuvable</h2>

                        <p className="mb-8 text-sm text-muted-foreground md:text-base">
                            Oups ! La page que vous recherchez semble s'être égarée dans les méandres d'Aureo, ou elle n'existe plus.
                        </p>

                        <Link
                            href="/"
                            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-purple-600 px-8 py-3.5 font-bold text-white shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-95 sm:w-auto"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Retour à l'accueil
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
