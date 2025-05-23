import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Ask Questions - StudAIs",
    description: "AI-Powered Study Tools",
};

export default async function AskQuestionsLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token");
    const refreshToken = (await cookieStore).get("refresh_token");

    if (!accessToken || !refreshToken) {
        redirect("/login");
    }    return (
        <SidebarProvider>
            <div className="askquestions-layout flex min-w-screen max-w-screen h-screen">
                <AppSidebar />
                <main className="askquestions-content flex-1 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-20">
                        <SidebarTrigger />
                    </div>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}