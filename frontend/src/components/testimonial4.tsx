import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const Testimonial4 = () => {
    return (
        <section className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36">
            <div className="container mx-auto">
                <div className="flex flex-col gap-6">
                    {/* Top Section with Image and Main Testimonial */}
                    <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-4">
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
                    </div>

                    {/* Bottom Section with Additional Testimonials */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                                <q>
                                    The summarization feature saves me hours of time. I can focus on understanding concepts rather than sifting through notes.
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
                                        <p className="font-medium">Alex Johnson</p>
                                        <p className="text-muted-foreground">Graduate, Tech Academy</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                                <q>
                                    The AI quizzes are a game-changer. They help me test my knowledge and identify areas I need to improve.
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
                                        <p className="font-medium">Michael Lee</p>
                                        <p className="text-muted-foreground">Educator, Learning Hub</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                                <q>
                                    StudAIs makes learning accessible and affordable. It&apos;s the perfect companion for students on a budget.
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
                                        <p className="font-medium">Emily Davis</p>
                                        <p className="text-muted-foreground">Freelancer, Self-Learner</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Testimonial4 };