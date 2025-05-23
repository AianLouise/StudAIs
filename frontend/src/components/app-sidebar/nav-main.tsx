"use client";

import { type LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

// Helper function to get icon color style
const getIconColorClass = (color: string | undefined, isActive: boolean) => {
    if (isActive) return 'text-primary';
    
    switch (color) {
        case 'blue': return 'text-blue-500';
        case 'purple': return 'text-purple-500';
        case 'emerald': return 'text-emerald-500';
        case 'amber': return 'text-amber-500';
        case 'rose': return 'text-rose-500';
        case 'indigo': return 'text-indigo-500';
        case 'gray': return 'text-gray-500';
        default: return '';
    }
};

export function NavMain({
    items,
    currentPath,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        iconColor?: string;
    }[];
    currentPath?: string;
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = currentPath === item.url;
                        return (
                            <SidebarMenuItem key={item.title}>                                <SidebarMenuButton 
                                    asChild 
                                    tooltip={item.title}
                                    className={`transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                                >
                                    <Link href={item.url} passHref className="flex items-center">
                                        {item.icon && <item.icon className={`h-5 w-5 mr-3 ${getIconColorClass(item.iconColor, isActive)}`} />}
                                        <span>{item.title}</span>
                                        {isActive && <div className="ml-auto w-1 h-5 rounded-full bg-primary"></div>}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}