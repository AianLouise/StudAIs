import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Register - StudAIs",
    description: "AI-Powered Study Tools",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="register-layout">
        <div className="register-content">{children}</div>
      </div>
    );
  }