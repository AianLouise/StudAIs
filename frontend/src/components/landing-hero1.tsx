import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero1Props {
    badge?: string;
    heading?: string;
    description?: string;
    buttons?: {
        primary?: {
            text: string;
            url: string;
        };
        secondary?: {
            text: string;
            url: string;
        };
    };
    image?: {
        src: string;
        alt: string;
    };
}

const Hero1 = ({
    badge = "✨ AI-Powered Study Tools",
    heading = "Welcome to StudAIs",
    description = "Ask questions, summarize notes, quiz yourself – all powered by AI. Transform your study experience today.",
    buttons = {
        primary: {
            text: "Get Started for Free",
            url: "/register",
        },
        secondary: {
            text: "Learn More",
            url: "/about",
        },
    },
    image = {
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyYWluLWNpcmN1aXQtaWNvbiBsdWNpZGUtYnJhaW4tY2lyY3VpdCI+PHBhdGggZD0iTTEyIDVhMyAzIDAgMSAwLTUuOTk3LjEyNSA0IDQgMCAwIDAtMi41MjYgNS43NyA0IDQgMCAwIDAgLjU1NiA2LjU4OEE0IDQgMCAxIDAgMTIgMThaIi8+PHBhdGggZD0iTTkgMTNhNC41IDQuNSAwIDAgMCAzLTQiLz48cGF0aCBkPSJNNi4wMDMgNS4xMjVBMyAzIDAgMCAwIDYuNDAxIDYuNSIvPjxwYXRoIGQ9Ik0zLjQ3NyAxMC44OTZhNCA0IDAgMCAxIC41ODUtLjM5NiIvPjxwYXRoIGQ9Ik02IDE4YTQgNCAwIDAgMS0xLjk2Ny0uNTE2Ii8+PHBhdGggZD0iTTEyIDEzaDQiLz48cGF0aCBkPSJNMTIgMThoNmEyIDIgMCAwIDEgMiAydjEiLz48cGF0aCBkPSJNMTIgOGg4Ii8+PHBhdGggZD0iTTE2IDhWNWEyIDIgMCAwIDEgMi0yIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMyIgcj0iLjUiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjMiIHI9Ii41Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMSIgcj0iLjUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjgiIHI9Ii41Ii8+PC9zdmc+",
        alt: "Hero section demo image showing AI-powered tools",
    },
}: Hero1Props) => {
    return (
        <section className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36">
            <div className="container mx-auto">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    {/* Text Section */}
                    <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
                        {badge && (
                            <Badge variant="outline" className="flex items-center">
                                {badge}
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Badge>
                        )}
                        <h1 className="my-6 text-3xl font-bold leading-tight text-pretty sm:text-4xl lg:text-6xl">
                            {heading}
                        </h1>
                        <p className="mb-8 max-w-xl text-muted-foreground sm:text-lg lg:text-xl">
                            {description}
                        </p>
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            {buttons?.primary && (
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                                </Button>
                            )}
                            {buttons?.secondary && (
                                <Button asChild variant="outline" className="w-full sm:w-auto">
                                    <Link href={buttons.secondary.url}>
                                        {buttons.secondary.text}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={300} // Smaller width for mobile
                            height={300} // Smaller height for mobile
                            className="max-h-48 w-auto rounded-md object-cover sm:max-h-64 lg:max-h-96"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero1 };