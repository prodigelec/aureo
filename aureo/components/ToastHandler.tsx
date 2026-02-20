"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function ToastContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success || error) {
            if (success) {
                toast.success(success);
            }

            if (error) {
                toast.error(error);
            }

            // Clean up the URL
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete("success");
            newSearchParams.delete("error");

            const newUrl = pathname + (newSearchParams.toString() ? `?${newSearchParams.toString()}` : "");
            router.replace(newUrl, { scroll: false });
        }
    }, [searchParams, pathname, router]);

    return null;
}

export function ToastHandler() {
    return (
        <Suspense>
            <ToastContent />
        </Suspense>
    );
}
