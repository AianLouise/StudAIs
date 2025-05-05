import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Login - StudAIs",
    description: "AI-Powered Study Tools",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="login-layout">
            <div className="login-content">{children}</div>
        </div>
    );
}