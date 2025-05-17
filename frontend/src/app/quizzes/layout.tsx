import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Quizzes - StudAIs",
    description: "AI-Powered Study Tools",
};

export default async function QuizzesLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token");
    const refreshToken = (await cookieStore).get("refresh_token");

    if (!accessToken || !refreshToken) {
        redirect("/login");
    }

    return (
        <SidebarProvider>
            <div className="dashboard-layout flex min-w-screen max-w-screen">
                <AppSidebar />
                <main className="dashboard-content flex-1 overflow-hidden p-4">
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}