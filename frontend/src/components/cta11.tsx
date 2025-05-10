import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion"; // Import framer-motion
import { useRef } from "react";

const Cta11 = () => {
    const heading = "Transform Your Study Experience";
    const description =
        "Ask questions, summarize notes, and quiz yourself – all powered by AI. Start your journey with StudAIs today.";
    const buttons = {
        primary: {
            text: "Get Started",
            url: "/register",
        },
        secondary: {
            text: "Learn More",
            url: "https://www.studais.com/learn-more",
        },
    };

    const ref = useRef(null); // Create a ref for the section
    const isInView = useInView(ref, { once: true }); // Trigger animation only once when in view

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move up from 50px
            animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36"
        >
            <div className="container mx-auto">
                <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
                    <motion.h3
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-4 max-w-3xl text-2xl font-semibold sm:text-3xl lg:text-4xl lg:mb-6"
                    >
                        {heading}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-8 max-w-3xl text-muted-foreground sm:text-lg lg:text-xl"
                    >
                        {description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex w-full flex-col justify-center gap-4 sm:flex-row"
                    >
                        {buttons.secondary && (
                            <Button variant="outline" className="w-full sm:w-auto" asChild>
                                <Link href={buttons.secondary.url}>{buttons.secondary.text}</Link>
                            </Button>
                        )}
                        {buttons.primary && (
                            <Button className="w-full sm:w-auto" asChild>
                                <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                            </Button>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export { Cta11 };