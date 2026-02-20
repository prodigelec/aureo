"use client";

import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

export default function TrustBadges() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 hidden items-center justify-center gap-6 md:flex"
        >
            <div className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                <Shield className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                    RGPD Compliant
                </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                <Lock className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                    SSL Secure
                </span>
            </div>
        </motion.div>
    );
}
