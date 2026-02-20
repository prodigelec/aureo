"use client";

import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";

interface FormInputProps {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    isFocused: boolean;
    icon: LucideIcon;
    showSuccess?: boolean;
    rightElement?: React.ReactNode;
}

export default function FormInput({
    id,
    name,
    label,
    type,
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    isFocused,
    icon: Icon,
    showSuccess,
    rightElement,
}: FormInputProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1.5"
        >
            <label className="block text-xs font-semibold md:text-sm" htmlFor={id}>
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Icon
                        className={`h-4 w-4 transition-colors md:h-5 md:w-5 ${isFocused ? "text-primary" : "text-muted-foreground"
                            }`}
                    />
                </div>

                <input
                    className={`w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-10 text-xs outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 md:pl-12 md:text-sm ${rightElement ? "pr-12" : "pr-4"
                        }`}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                {showSuccess && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <Check className="h-4 w-4 text-green-500" strokeWidth={3} />
                    </div>
                )}

                {rightElement && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        {rightElement}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
