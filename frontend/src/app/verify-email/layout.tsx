import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Verify Email - StudAIs",
    description: "Verify your email to access AI-powered study tools.",
};

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="verify-email-layout">
            <div className="verify-email-content">{children}</div>
        </div>
    );
}