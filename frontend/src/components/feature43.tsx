import {
    BatteryCharging,
    GitPullRequest,
    Layers,
    RadioTower,
    SquareKanban,
    WandSparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion"; // Import framer-motion
import { useRef } from "react";

interface Reason {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Feature43Props {
    heading?: string;
    reasons?: Reason[];
}

const Feature43 = ({
    heading = "Why Choose StudAIs?",
    reasons = [
        {
            title: "AI-Powered Learning",
            description:
                "Leverage cutting-edge AI tools to ask questions, summarize notes, and quiz yourself effortlessly.",
            icon: <WandSparkles className="size-6" />,
        },
        {
            title: "Personalized Experience",
            description:
                "Get tailored recommendations and insights to focus on areas where you need the most improvement.",
            icon: <SquareKanban className="size-6" />,
        },
        {
            title: "24/7 Support",
            description:
                "Access reliable support anytime to ensure a seamless and hassle-free learning experience.",
            icon: <RadioTower className="size-6" />,
        },
        {
            title: "Proven Results",
            description:
                "Achieve better grades and deeper understanding with tools designed to maximize your learning potential.",
            icon: <Layers className="size-6" />,
        },
        {
            title: "Efficiency",
            description:
                "Save time with AI-driven tools that streamline your study process and boost productivity.",
            icon: <BatteryCharging className="size-6" />,
        },
        {
            title: "Collaborative Features",
            description:
                "Work with peers and share insights using collaborative tools to enhance group learning.",
            icon: <GitPullRequest className="size-6" />,
        },
    ],
}: Feature43Props) => {
    const ref = useRef(null); // Create a ref for the section
    const isInView = useInView(ref, { once: true }); // Trigger animation only once when in view

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }} // Start with opacity 0 and slightly scaled down
            animate={isInView ? { opacity: 1, scale: 1 } : {}} // Animate to full opacity and scale
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36"
        >
            <div className="container mx-auto">
                {/* Heading Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 md:mb-20"
                >
                    <h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl lg:text-5xl">
                        {heading}
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                staggerChildren: 0.2, // Stagger animation for child elements
                            },
                        },
                    }}
                    className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3"
                >
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1 },
                            }}
                            className="flex flex-col items-center text-center sm:items-start sm:text-left"
                        >
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                {reason.title}
                            </h3>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export { Feature43 };