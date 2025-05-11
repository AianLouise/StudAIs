import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Reset Password - StudAIs",
    description: "Reset your account password for AI-powered study tools.",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="reset-password-layout">
            <div className="reset-password-content">{children}</div>
        </div>
    );
}