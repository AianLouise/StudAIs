import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Import sidebar components
import { AppSidebar } from "@/components/app-sidebar"; // Import the sidebar component

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Dashboard - StudAIs",
    description: "AI-Powered Study Tools",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="dashboard-layout flex">
                <AppSidebar />
                <main className="dashboard-content flex-1 p-4">
                    {/* Sidebar trigger button can be placed here */}
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
