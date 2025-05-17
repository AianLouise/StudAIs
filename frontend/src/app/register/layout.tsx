import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
    title: "Register - StudAIs",
    description: "AI-Powered Study Tools",
};

export default async function RegisterLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token");
    const refreshToken = (await cookieStore).get("refresh_token");

    if (accessToken && refreshToken) {
        redirect("/dashboard");
    }

    return (
      <div className="register-layout">
        <div className="register-content">{children}</div>
      </div>
    );
}