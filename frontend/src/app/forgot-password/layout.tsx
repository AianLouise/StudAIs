import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Forgot Password - StudAIs",
    description: "Reset your password for AI-powered study tools.",
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="forgot-password-layout">
            <div className="forgot-password-content">{children}</div>
        </div>
    );
}