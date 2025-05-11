import { Book, Menu, Sunset, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar1 = ({
    logo = {
        url: "/",
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyYWluLWNpcmN1aXQtaWNvbiBsdWNpZGUtYnJhaW4tY2lyY3VpdCI+PHBhdGggZD0iTTEyIDVhMyAzIDAgMSAwLTUuOTk3LjEyNSA0IDQgMCAwIDAtMi41MjYgNS43NyA0IDQgMCAwIDAgLjU1NiA2LjU4OEE0IDQgMCAxIDAgMTIgMThaIi8+PHBhdGggZD0iTTkgMTNhNC41IDQuNSAwIDAgMCAzLTQiLz48cGF0aCBkPSJNNi4wMDMgNS4xMjVBMyAzIDAgMCAwIDYuNDAxIDYuNSIvPjxwYXRoIGQ9Ik0zLjQ3NyAxMC44OTZhNCA0IDAgMCAxIC41ODUtLjM5NiIvPjxwYXRoIGQ9Ik02IDE4YTQgNCAwIDAgMS0xLjk2Ny0uNTE2Ii8+PHBhdGggZD0iTTEyIDEzaDQiLz48cGF0aCBkPSJNMTIgMThoNmEyIDIgMCAwIDEgMiAydjEiLz48cGF0aCBkPSJNMTIgOGg4Ii8+PHBhdGggZD0iTTE2IDhWNWEyIDIgMCAwIDEgMi0yIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMyIgcj0iLjUiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjMiIHI9Ii41Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMSIgcj0iLjUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjgiIHI9Ii41Ii8+PC9zdmc+",
        alt: "StudAIs Logo",
        title: "StudAIs",
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Features",
            url: "#",
            items: [
                {
                    title: "AI-Powered Quizzes",
                    description: "Create quizzes with tailored questions to test your knowledge.",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "/features/quizzes",
                },
                {
                    title: "Summarize Notes",
                    description: "Let StudAIs summarize your notes for easy review.",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "/features/summarize",
                },
                {
                    title: "AI Assistance",
                    description: "Get quick help with explanations and study material.",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "/features/assistance",
                },
            ],
        },
        {
            title: "Resources",
            url: "#",
            items: [
                {
                    title: "Help Center",
                    description: "Get all the answers you need right here.",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "/resources/help-center",
                },
                {
                    title: "Contact Us",
                    description: "We are here to help you with any questions you have.",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "/resources/contact",
                },
                {
                    title: "Blog",
                    description: "Read the latest updates and insights from StudAIs.",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "/blog",
                },
            ],
        },
        {
            title: "Pricing",
            url: "/pricing",
        },
        {
            title: "About Us",
            url: "/about",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: Navbar1Props) => {
    return (
        <section className="py-4 px-4 lg:py-6 lg:px-10">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href={logo.url} className="flex items-center gap-2">
                                            <Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline">
                                            <Link href={auth.login.url}>{auth.login.title}</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href={auth.signup.url}>{auth.signup.title}</Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title} className="relative">
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent
                    className="absolute left-0 mt-2 min-w-[300px] w-auto max-w-[550px] bg-popover text-popover-foreground shadow-lg rounded-md"
                >
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="block">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};


export { Navbar1 };