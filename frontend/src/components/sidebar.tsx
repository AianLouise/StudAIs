"use client"; // Mark this as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import shadcn Tooltip
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import shadcn DropdownMenu
import {
    HomeIcon,
    ActivityLogIcon,
    LightningBoltIcon,
    AvatarIcon,
} from "@radix-ui/react-icons"; // Import Radix Icons (used by shadcn)
import { Toaster, toast } from "sonner"; // Import Sonner

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed
    const router = useRouter();

    const handleMouseEnter = () => {
        setIsOpen(true); // Open sidebar on hover
    };

    const handleMouseLeave = () => {
        setIsOpen(false); // Close sidebar when mouse leaves
    };

    const handleLogout = () => {
        // Perform logout logic here
        console.log("User logged out");
        toast.success("Logged out successfully! Redirecting to login page...");
        router.push("/login"); // Redirect to login page
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full ${
                    isOpen ? "w-16" : "w-6"
                } bg-gray-900 flex flex-col items-center py-4 overflow-hidden transition-all duration-300`}
            >
                {/* Icon 1: Home */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="mb-4 rounded-full p-3 text-white"
                                onClick={() => router.push("/")}
                            >
                                <HomeIcon className="h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Home</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Icon 2: Activity */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="mb-4 rounded-full p-3 text-white"
                                onClick={() => router.push("/activity")}
                            >
                                <ActivityLogIcon className="h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Activity</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Repeat similar structure for other icons */}

                {/* Profile Section */}
                <div className="mt-auto mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full text-white p-3 hover:bg-gray-700">
                                <AvatarIcon className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-white text-sm rounded shadow-md">
                            <DropdownMenuItem
                                className="cursor-pointer px-4 py-2 hover:bg-gray-700 rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;