"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { LoginForm } from "@/components/login-form";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

export default function LoginPage() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true); // State to track loading

    useEffect(() => {
        const accessToken = Cookies.get("access_token"); // Check for access token in cookies
        if (accessToken) {
            router.push("/dashboard"); // Redirect to the dashboard if already logged in
        } else {
            setIsChecking(false); // Stop loading if no token is found
        }
    }, [router]);

    if (isChecking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <BrainCircuit className="size-4" />
                        </div>
                        StudAIs
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image Placeholder"
                    fill
                    className="object-cover absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}