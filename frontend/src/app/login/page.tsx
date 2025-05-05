"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Head from "next/head";
import { toast } from "sonner"; // Import Sonner
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"; // Import Radix Icons

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/login/`,
                {
                    username,
                    password,
                }
            );

            toast.success("Login Successful! Redirecting to your dashboard...");
            router.push("/dashboard"); // Redirect to the dashboard
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.error || "An error occurred. Please try again.";
            toast.error(`Login Failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-2 relative">
            {/* Logo Placeholder */}
            <div className="absolute top-4 right-4">
                <a href="/">
                    <img
                        src="https://placehold.co/250x50"
                        alt="Logo Placeholder"
                        className="rounded-full"
                    />
                </a>
            </div>

            {/* Left side: Image placeholder */}
            <div className="bg-slate-500 flex items-center justify-center">
                <img
                    src="https://placehold.co/300x300"
                    alt="Image Placeholder"
                    className="w-3/4 h-3/4 object-cover"
                />
            </div>

            {/* Right side: Login form */}
            <div className="bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">
                    Login to StudAIs
                </h1>
                <form onSubmit={handleLogin} className="w-full max-w-md">
                    <div className="mb-4">
                        <Label htmlFor="username" className="mb-2 text-gray-700">
                            Username
                        </Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-label="Username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="password" className="mb-2 text-gray-700">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                type={isPasswordVisible ? "text" : "password"} // Toggle input type
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
                            >
                                {isPasswordVisible ? (
                                    <EyeClosedIcon className="h-4 w-4" />
                                ) : (
                                    <EyeOpenIcon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-slate-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;