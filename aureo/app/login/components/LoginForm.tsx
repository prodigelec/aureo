"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { loginAction } from "@/app/auth/actions";
import FormInput from "@/app/register/components/FormInput";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, null);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
                <h2 className="text-2xl font-black mb-1">Connexion</h2>
                <p className="text-xs text-muted-foreground">Heureux de vous revoir.</p>
            </div>

            <form action={formAction} className="space-y-4">
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
                    showSuccess={formData.email.includes("@")}
                />

                <div className="space-y-2">
                    <FormInput
                        id="password"
                        name="password"
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "password"}
                        icon={Lock}
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
                                    Connexion en cours...
                                </>
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>

                <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                        Pas encore de compte ?{" "}
                        <Link className="font-bold text-primary hover:underline" href="/register">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
