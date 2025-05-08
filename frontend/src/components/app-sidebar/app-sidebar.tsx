"use client";

import * as React from "react";
import {
    LayoutDashboardIcon,
    BrainCircuit,
    ClipboardListIcon,
    TrendingUpIcon,
    FileTextIcon,
    HelpCircleIcon,
} from "lucide-react";

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

    React.useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/auth/get-user-details/`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`, // Retrieve token from cookies
                        },
                    }
                );
                const { first_name, last_name, email } = response.data;
                setUser({
                    name: `${first_name} ${last_name}`,
                    email: email,
                    avatar: "", // Update this if the API provides an avatar URL
                });
            } catch (error) {
                toast.error("Session expired. Please log in again.");

                Cookies.remove("access_token"); // Clear the access token
                Cookies.remove("refresh_token"); // Clear the refresh token

                router.push("/login"); // Redirect to login if fetching fails
            }
        };

        fetchUserDetails();
    }, [router]);

    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Ask Questions",
            url: "/ask-questions",
            icon: HelpCircleIcon, // Icon representing help or questions
        },
        {
            title: "Summarize Notes",
            url: "#",
            icon: FileTextIcon, // Icon representing text or notes
        },
        {
            title: "Quizzes",
            url: "#",
            icon: ClipboardListIcon, // Icon representing quizzes or tasks
        },
        {
            title: "Progress Tracker",
            url: "#",
            icon: TrendingUpIcon, // Icon representing progress or growth
        },
    ];

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/">
                                <BrainCircuit className="h-5 w-5" />
                                <span className="text-base font-semibold">StudAIs</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}