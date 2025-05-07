import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Import sidebar components
import { AppSidebar } from "@/components/app-sidebar/app-sidebar"; // Import the sidebar component

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Ask Questions - StudAIs",
    description: "AI-Powered Study Tools",
};

export default function AskQuestionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="askquestions-layout flex">
                <AppSidebar />
                <main className="askquestions-content flex-1 p-4">
                    {/* Sidebar trigger button can be placed here */}
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
