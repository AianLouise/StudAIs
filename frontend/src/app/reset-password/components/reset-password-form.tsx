"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import Sonner for notifications
import axios from "axios";

export function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token"); // Get token from URL
        if (!token) {
            toast.error("Invalid or missing reset token.");
            router.push("/login"); // Redirect to login page if no token is found
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }
    
        setIsSubmitting(true);
    
        try {
            const token = new URLSearchParams(window.location.search).get("token"); // Get token from URL
            const email = new URLSearchParams(window.location.search).get("email"); // Get email from URL
            if (!token || !email) {
                toast.error("Invalid or missing reset token or email.");
                return;
            }
    
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/reset-password/`, {
                token,
                password,
                email,
            });
    
            toast.success("Password reset successfully! Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000); // Redirect to login page after 2 seconds
        } catch (error) {
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
        </form>
    );
}