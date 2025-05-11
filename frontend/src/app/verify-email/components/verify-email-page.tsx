"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerifying, setIsVerifying] = useState(false); // Default to not verifying
    const [email, setEmail] = useState<string | null>(null); // Store email for resending verification
    const [showResendOnly, setShowResendOnly] = useState(false); // Track if we should only show resend option
    const [isInvalidLink, setIsInvalidLink] = useState(false); // Track if the link is invalid
    const [isCooldown, setIsCooldown] = useState(false); // Cooldown state for preventing spamming
    const [cooldownTime, setCooldownTime] = useState(30); // Cooldown time in seconds
    const [isResending, setIsResending] = useState(false); // Track if the resend request is in progress

    useEffect(() => {
        const uid = searchParams.get("uid");
        const token = searchParams.get("token");

        // Check if the page is accessed without query parameters (from login flow)
        if (!uid || !token) {
            const storedEmail = localStorage.getItem("email");

            if (!storedEmail) {
                // Redirect to login page if no email is set
                toast.error("No email found. Please log in again.");
                router.push("/login");
                return;
            }

            setShowResendOnly(true); // Show only the resend email option
            setEmail(storedEmail);
            return;
        }

        const verifyEmail = async () => {
            setIsVerifying(true);

            try {
                // Send the UID and token to the backend for verification
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/verify-email/`,
                    {
                        params: { uid, token },
                    }
                );

                toast.success(response.data.message || "Email verified successfully!");

                // Clear the email from localStorage after successful verification
                localStorage.removeItem("email");

                router.push("/login"); // Redirect to login page after successful verification
            } catch (error) {
                const errorMessage =
                    (axios.isAxiosError(error) && error.response?.data?.error) ||
                    "Invalid or expired verification link.";
                toast.error(errorMessage);
                setIsInvalidLink(true); // Mark the link as invalid
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    useEffect(() => {
        // Check if a cooldown is already in progress
        const cooldownEndTime = localStorage.getItem("cooldownEndTime");
        if (cooldownEndTime) {
            const remainingTime = Math.floor((parseInt(cooldownEndTime) - Date.now()) / 1000);
            if (remainingTime > 0) {
                setIsCooldown(true);
                setCooldownTime(remainingTime);
                startCooldown(remainingTime);
            }
        }
    }, []);

    const handleResendVerification = async () => {
        if (!email) {
            toast.error("No email found. Please log in again.");
            return;
        }

        setIsResending(true); // Set resending state to true

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/resend-verification/`,
                { email }
            );

            toast.success(response.data.message || "Verification email resent successfully!");
            startCooldown(30); // Start cooldown after a successful resend
        } catch (error) {
            const errorMessage =
                (axios.isAxiosError(error) && error.response?.data?.error) ||
                "Failed to resend verification email. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsResending(false); // Reset resending state
        }
    };

    const startCooldown = (duration: number) => {
        setIsCooldown(true);
        setCooldownTime(duration);

        // Store the cooldown end time in localStorage
        const cooldownEndTime = Date.now() + duration * 1000;
        localStorage.setItem("cooldownEndTime", cooldownEndTime.toString());

        const interval = setInterval(() => {
            setCooldownTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCooldown(false); // Re-enable the button after cooldown
                    localStorage.removeItem("cooldownEndTime"); // Clear cooldown from localStorage
                    return 30; // Reset cooldown time
                }
                return prev - 1;
            });
        }, 1000); // Decrease cooldown time every second
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify Your Email</CardTitle>
                    <CardDescription>
                        {isVerifying
                            ? "We are verifying your email. Please wait..."
                            : !email
                                ? "No email found. Please log in again."
                                : isInvalidLink
                                    ? "The verification link is invalid or has expired."
                                    : showResendOnly
                                        ? "Your email is not verified. You can resend the verification email below."
                                        : "Verification failed. You can resend the verification email below."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    {isVerifying ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                        </div>
                    ) : isInvalidLink ? (
                        <p className="text-sm text-muted-foreground">
                            Please check your email for a valid verification link or contact support if the issue persists.
                        </p>
                    ) : (
                        <>
                            {email && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Email: <span className="font-medium">{email}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        If you didn’t receive the email, you can resend it.
                                    </p>
                                </div>
                            )}
                            {email && (
                                <Button
                                    onClick={handleResendVerification}
                                    className="w-full"
                                    disabled={isCooldown || isResending} // Disable button during cooldown or resending
                                >
                                    {isResending
                                        ? "Resending..."
                                        : isCooldown
                                            ? `Resend in ${cooldownTime}s`
                                            : "Resend Verification Email"}
                                </Button>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}