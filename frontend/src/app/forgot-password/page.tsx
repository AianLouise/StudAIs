"use client";

import { ForgotPasswordForm } from "./components/forgot-password-form";
import Link from "next/link"; // Import Link from next/link

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-4 text-2xl font-bold text-center">Forgot Password</h1>
                <p className="mb-6 text-sm text-muted-foreground text-center">
                    Enter your email address below, and we’ll send you instructions to reset your password.
                </p>
                <ForgotPasswordForm />
                <p className="mt-4 text-center text-sm">
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                        Go back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}