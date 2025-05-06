import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Testimonial4 = () => {
    return (
        <section className="py-32 px-36">
            <div className="container">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
                        <img
                            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                            alt="placeholder"
                            className="h-72 w-full rounded-md object-cover lg:h-auto"
                        />
                        <Card className="col-span-2 flex items-center justify-center p-6">
                            <div className="flex flex-col gap-4">
                                <q className="text-xl font-medium lg:text-3xl">
                                    StudAIs has completely transformed the way I study. The AI-powered tools are intuitive, efficient, and incredibly helpful.
                                </q>
                                <div className="flex flex-col items-start">
                                    <p>Jane Smith</p>
                                    <p className="text-muted-foreground">Student, University of Learning</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <Card>
                            <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                                <q>
                                    The summarization feature saves me hours of time. I can focus on understanding concepts rather than sifting through notes.
                                </q>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4 leading-5">
                                    <Avatar className="size-9 rounded-full ring-1 ring-input">
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
                                    <Avatar className="size-9 rounded-full ring-1 ring-input">
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
                                    StudAIs makes learning accessible and affordable. It's the perfect companion for students on a budget.
                                </q>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4 leading-5">
                                    <Avatar className="size-9 rounded-full ring-1 ring-input">
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
