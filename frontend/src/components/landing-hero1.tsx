import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion"; // Import framer-motion and useInView
import { useRef } from "react";

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
        src: "/placeholder.svg", // Placeholder .svg from the public directory
        alt: "Hero section demo image showing AI-powered tools",
    },
}: Hero1Props) => {
    const ref = useRef(null); // Create a ref for the section
    const isInView = useInView(ref, { once: true }); // Trigger animation only once when in view

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move up from 50px
            animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            className="py-16 px-6 sm:py-24 sm:px-12 lg:py-40 lg:px-36"
        >
            <div className="container mx-auto">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center text-center lg:items-start lg:text-left"
                    >
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

                        {/* Image Under Description for Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex justify-center mb-8 lg:hidden" // Visible only on mobile
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={400}
                                height={400}
                                className="max-h-64 w-auto rounded-md object-cover sm:max-h-96"
                            />
                        </motion.div>

                        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
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
                    </motion.div>

                    {/* Image Beside Text for Desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:flex justify-center" // Visible only on desktop
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={400}
                            className="max-h-64 w-auto rounded-md object-cover lg:max-h-96"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export { Hero1 };