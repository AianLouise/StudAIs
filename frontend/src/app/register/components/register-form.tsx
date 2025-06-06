"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import Sonner
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"; // Import Radix Icons
import Link from "next/link";

export function RegisterForm() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            // Send registration request to the backend
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/register/`,
                {
                    firstname,
                    lastname,
                    email,
                    username,
                    password,
                }
            );

            // Store email in localStorage for verification purposes
            localStorage.setItem("email", email);

            toast.success("Registration successful! Please verify your email.");
            setTimeout(() => router.push("/verify-email"), 2000); // Redirect to Verify Email page after 2 seconds
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
            toast.error(`Registration Failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Fill in the details below to create your account.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                        id="firstname"
                        type="text"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                        id="lastname"
                        type="text"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                                <EyeOpenIcon className="h-4 w-4" />
                            ) : (
                                <EyeClosedIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() =>
                                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                            }
                        >
                            {isConfirmPasswordVisible ? (
                                <EyeOpenIcon className="h-4 w-4" />
                            ) : (
                                <EyeClosedIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>
    );
}