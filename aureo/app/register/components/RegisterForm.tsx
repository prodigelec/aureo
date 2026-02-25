"use client";

import { useMemo, useState, useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { registerAction } from "@/app/auth/actions";
import FormInput from "./FormInput";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, null);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [dismissedFields, setDismissedFields] = useState<Set<string>>(
        () => new Set()
    );

    const fieldErrors = useMemo(() => {
        const next: Record<string, string[]> = {};
        const serverErrors = state?.fieldErrors ?? {};
        Object.entries(serverErrors).forEach(([key, value]) => {
            if (!dismissedFields.has(key) && value) {
                next[key] = value;
            }
        });
        return next;
    }, [state?.fieldErrors, dismissedFields]);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user changes input
        setDismissedFields((prev) => {
            const next = new Set(prev);
            next.add(name);
            return next;
        });
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        // Caps at 4 levels for the UI bars
        return Math.min(strength, 4);
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="p-8 md:p-10 lg:p-14">
            {/* Mobile/Tablet Header */}
            <div className="mb-8 md:hidden">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                        <Image src="/logo_aureo.png" alt="Aureo" width={22} height={22} priority />
                    </div>
                    <span className="text-lg font-bold">Aureo</span>
                </div>
                <h2 className="text-2xl font-black mb-1">Créer un compte</h2>
                <p className="text-xs text-muted-foreground">Commencez vos 30 jours gratuits maintenant.</p>
            </div>

            <form
                action={formAction}
                className="space-y-4"
                onSubmit={() => setDismissedFields(new Set())}
            >
                <FormInput
                    id="name"
                    name="name"
                    label="Nom complet"
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "name"}
                    icon={User}
                    showSuccess={!!formData.name && !fieldErrors.name}
                    error={fieldErrors.name?.[0]}
                />

                <FormInput
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="jean@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "email"}
                    icon={Mail}
                    showSuccess={formData.email.includes("@") && !fieldErrors.email}
                    error={fieldErrors.email?.[0]}
                />

                <div className="space-y-2">
                    <FormInput
                        id="password"
                        name="password"
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 caractères"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "password"}
                        icon={Lock}
                        error={fieldErrors.password?.[0]}
                        rightElement={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                            </button>
                        }
                    />

                    {formData.password && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                            <div className="mb-1.5 flex gap-1">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength
                                            ? level <= 2
                                                ? "bg-red-500"
                                                : level === 3
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                            : "bg-muted/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="pt-4">
                    <motion.button
                        whileHover={!isPending ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isPending ? { scale: 0.98 } : {}}
                        disabled={isPending}
                        className={`group relative w-full overflow-hidden rounded-xl py-3 font-bold shadow-2xl transition-all duration-300 ${isPending ? "opacity-70 cursor-not-allowed" : "shadow-primary/30"
                            }`}
                        type="submit"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary [background-size:200%]" />
                        <span className="relative flex items-center justify-center gap-2 text-xs text-white md:text-sm">
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Inscription en cours...
                                </>
                            ) : (
                                <>
                                    Soumettre mon inscription
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>

                <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                        Déjà un compte ?{" "}
                        <Link className="font-bold text-primary hover:underline" href="/login">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
