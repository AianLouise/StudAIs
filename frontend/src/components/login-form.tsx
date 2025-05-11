"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [identifier, setIdentifier] = useState(""); // Can be email or username
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

        const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/login/`,
                {
                    username: identifier,
                    password,
                }
            );
    
            const { access, refresh, is_verified, email } = response.data.tokens;
    
            // Check if the user is verified
            if (!is_verified) {
                toast.error("Your email is not verified. Please verify your email.");
                localStorage.setItem("email", email); // Store the email for verification purposes
                router.push("/verify-email"); // Redirect to Verify Email page
                return;
            }
    
            // Store the JWT tokens in cookies
            Cookies.set("access_token", access, { expires: 7, secure: true });
            Cookies.set("refresh_token", refresh, { expires: 7, secure: true });
    
            toast.success("Login Successful! Redirecting to your dashboard...");
            router.push("/dashboard"); // Redirect to the dashboard
        } catch (err: unknown) {
            let errorMessage = "An error occurred. Please try again.";
            if (
                err &&
                typeof err === "object" &&
                "response" in err &&
                err.response &&
                typeof err.response === "object" &&
                "data" in err.response &&
                err.response.data &&
                typeof err.response.data === "object" &&
                "error" in err.response.data &&
                typeof (err.response.data as { error?: unknown }).error === "string"
            ) {
                errorMessage = (err.response.data as { error: string }).error;
            }
            toast.error(`Login Failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email/username and password below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="identifier">Email or Username</Label>
                    <Input
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? (
                                <EyeClosedIcon className="h-4 w-4" />
                            ) : (
                                <EyeOpenIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm underline-offset-4 hover:underline text-right"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </form>
    );
}