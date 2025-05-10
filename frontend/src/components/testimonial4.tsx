import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { motion, useInView } from "framer-motion"; // Import framer-motion
import { useRef } from "react";

const Testimonial4 = () => {
    const ref = useRef(null); // Create a ref for the section
    const isInView = useInView(ref, { once: true }); // Trigger animation only once when in view

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, filter: "blur(10px)" }} // Start with opacity 0 and blur
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}} // Animate to full opacity and no blur
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36"
        >
            <div className="container mx-auto">
                <div className="flex flex-col gap-6">
                    {/* Top Section with Image and Main Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-4"
                    >
                        <Image
                            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                            alt="placeholder"
                            width={400}
                            height={288}
                            className="h-72 w-full rounded-md object-cover sm:h-80 lg:h-auto"
                        />
                        <Card className="col-span-2 flex items-center justify-center p-6">
                            <div className="flex flex-col gap-4">
                                <q className="text-lg font-medium sm:text-xl lg:text-3xl">
                                    StudAIs has completely transformed the way I study. The AI-powered tools are intuitive, efficient, and incredibly helpful.
                                </q>
                                <div className="flex flex-col items-start">
                                    <p className="font-medium">Jane Smith</p>
                                    <p className="text-sm text-muted-foreground sm:text-base">
                                        Student, University of Learning
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Bottom Section with Additional Testimonials */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                filter: "blur(0px)",
                                transition: {
                                    staggerChildren: 0.2, // Stagger animation for child elements
                                },
                            },
                        }}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, filter: "blur(10px)" },
                                    visible: { opacity: 1, filter: "blur(0px)" },
                                }}
                            >
                                <Card>
                                    <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                                        <q>
                                            {i === 0
                                                ? "The summarization feature saves me hours of time. I can focus on understanding concepts rather than sifting through notes."
                                                : i === 1
                                                ? "The AI quizzes are a game-changer. They help me test my knowledge and identify areas I need to improve."
                                                : "StudAIs makes learning accessible and affordable. It's the perfect companion for students on a budget."}
                                        </q>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex gap-4 leading-5">
                                            <Avatar className="h-12 w-12 rounded-full ring-1 ring-input">
                                                <AvatarImage
                                                    src="https://shadcnblocks.com/images/block/avatar-1.webp"
                                                    alt="placeholder"
                                                />
                                            </Avatar>
                                            <div className="text-sm">
                                                <p className="font-medium">
                                                    {i === 0
                                                        ? "Alex Johnson"
                                                        : i === 1
                                                        ? "Michael Lee"
                                                        : "Emily Davis"}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {i === 0
                                                        ? "Graduate, Tech Academy"
                                                        : i === 1
                                                        ? "Educator, Learning Hub"
                                                        : "Freelancer, Self-Learner"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export { Testimonial4 };