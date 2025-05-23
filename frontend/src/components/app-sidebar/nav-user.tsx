"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    ChevronsUpDownIcon,
    UserCircleIcon,
    MoonIcon,
    SunIcon,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { toast } from "sonner";
import Cookies from "js-cookie";

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const [theme, setTheme] = React.useState<"light" | "dark">("light");

    React.useEffect(() => {
        // Check system theme preference
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(isDarkMode ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
    };

    const handleLogout = () => {
        // Clear tokens from cookies
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        // Clear user details from localStorage
        localStorage.removeItem("user_details");

        // Show a toast notification
        toast.success("You have been logged out successfully.");

        // Redirect to login page
        router.push("/login");
    };

    // Generate initials from the user's name
    const getInitials = (name: string) => {
        const names = name.split(" ");
        const initials = names.map((n) => n[0]).join("").toUpperCase();
        return initials.slice(0, 2); // Limit to 2 characters
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="w-full rounded-lg transition-colors hover:bg-muted data-[state=open]:bg-muted"
                        >
                            <Avatar className="h-9 w-9 rounded-full border-2 border-primary/20">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left ml-2 leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDownIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-3 p-3 text-left">
                                <Avatar className="h-10 w-10 rounded-full border-2 border-primary/20">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left leading-tight">
                                    <span className="truncate font-medium text-base">{user.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-3 p-3 cursor-pointer">
                                <UserCircleIcon className="h-4 w-4" />
                                <span>My Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 p-3 cursor-pointer">
                                <CreditCardIcon className="h-4 w-4" />
                                <span>Subscription</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 p-3 cursor-pointer">
                                <BellIcon className="h-4 w-4" />
                                <span>Notifications</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 p-3 cursor-pointer" onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <>
                                        <MoonIcon className="h-4 w-4" />
                                        <span>Dark Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <SunIcon className="h-4 w-4" />
                                        <span>Light Mode</span>
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-3 p-3 cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                            <LogOutIcon className="h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}