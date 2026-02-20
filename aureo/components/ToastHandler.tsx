"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function ToastContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success) {
            toast.success(success);
        }

        if (error) {
            // We only toast error if it hasn't been traditionally handled by the page's error state
            // But for general purpose, this handler is great for redirects
            toast.error(error);
        }
    }, [searchParams]);

    return null;
}

export function ToastHandler() {
    return (
        <Suspense>
            <ToastContent />
        </Suspense>
    );
}
