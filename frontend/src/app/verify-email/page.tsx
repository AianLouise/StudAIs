"use client";

import VerifyEmailPage from "./components/verify-email-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailPageWrapper() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard if the user is already verified
        const isVerified = localStorage.getItem("isVerified"); // Example: Replace with actual verification logic
        if (isVerified === "true") {
            router.push("/dashboard");
        }
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md">
                <VerifyEmailPage />
            </div>
        </div>
    );
}