import type { Metadata } from "next";
import { Toaster } from "sonner"; // Import Toaster from sonner
import "../globals.css";

export const metadata: Metadata = {
    title: "Dashboard - StudAIs",
    description: "AI-Powered Study Tools",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-layout">
            <Toaster position="top-right" />
            <div className="dashboard-content">{children}</div>
        </div>
    );
}