"use client";

import * as React from "react";
import {
    LayoutDashboardIcon,
    BrainCircuit,
    ClipboardListIcon,
    TrendingUpIcon,
    FileTextIcon,
    HelpCircleIcon,
    Sparkles,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import axios from "axios";
import { toast } from "sonner"; // Import toast for notifications
import { useRouter } from "next/navigation"; // Import useRouter
import Cookies from "js-cookie"; // Import js-cookie for cookie management

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = React.useState({
        name: "Loading...",
        email: "Loading...",
        avatar: "", // Placeholder for avatar
    });
    
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        // Try to get user details from localStorage
        const storedUser = localStorage.getItem("user_details");
        if (storedUser) {
            try {
                const { first_name, last_name, email } = JSON.parse(storedUser);
                setUser({
                    name: `${first_name} ${last_name}`,
                    email: email,
                    avatar: "",
                });
                return; // Skip API call if found in localStorage
            } catch {
                // If parsing fails, fallback to API call
            }
        }

        // Fallback: fetch from API if not in localStorage
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/get-user-details/`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`,
                        },
                    }
                );
                const { first_name, last_name, email } = response.data;
                setUser({
                    name: `${first_name} ${last_name}`,
                    email: email,
                    avatar: "",
                });
                localStorage.setItem("user_details", JSON.stringify(response.data));
            } catch {
                toast.error("Session expired. Please log in again.");

                Cookies.remove("access_token");
                Cookies.remove("refresh_token");

                router.push("/login");
            }
        };

        fetchUserDetails();
    }, [router]);    // Group navigation items by categories
    const mainNavItems = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
            iconColor: "blue",
        },
        {
            title: "Study AI Assistant",
            url: "/ask-questions",
            icon: Sparkles,
            iconColor: "indigo",
        },
        {
            title: "Summarize Notes",
            url: "/summarize-notes",
            icon: FileTextIcon,
            iconColor: "emerald",
        },
    ];    const studyNavItems = [
        {
            title: "Quizzes",
            url: "/quizzes",
            icon: ClipboardListIcon,
            iconColor: "amber",
        },
        {
            title: "Progress Tracker",
            url: "/progress",
            icon: TrendingUpIcon,
            iconColor: "rose",
        },
    ];

    return (
        <Sidebar 
            collapsible="offcanvas" 
            className="border-r shadow-sm bg-gradient-to-b from-background to-muted/20" 
            {...props}
        >
            <SidebarHeader className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-2 flex items-center justify-center bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                            <Link href="/">
                                <BrainCircuit className="h-6 w-6 text-blue-600" />
                                <span className="text-lg font-bold">StudAIs</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="px-3 py-2">
                <div className="mb-6">
                    <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Main
                    </h3>
                    <NavMain items={mainNavItems} currentPath={pathname} />
                </div>
                
                <div className="mb-6">
                    <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Study Tools
                    </h3>
                    <NavMain items={studyNavItems} currentPath={pathname} />
                </div>
            </SidebarContent>
            <SidebarFooter className="border-t p-3">
                <SidebarMenu className="mb-2">
                    <SidebarMenuItem>
                        <Link href="/settings" passHref>
                            <SidebarMenuButton 
                                asChild
                                className={`w-full ${pathname === '/settings' ? 'bg-muted' : ''}`}
                            >
                                <span>
                                    <Settings className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>Settings</span>
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}