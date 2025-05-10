import { Button } from "@/components/ui/button";
import Link from "next/link";

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

    return (
        <section className="py-16 px-6 sm:py-24 sm:px-12 lg:py-32 lg:px-36">
            <div className="container mx-auto">
                <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
                    <h3 className="mb-4 max-w-3xl text-2xl font-semibold sm:text-3xl lg:text-4xl lg:mb-6">
                        {heading}
                    </h3>
                    <p className="mb-8 max-w-3xl text-muted-foreground sm:text-lg lg:text-xl">
                        {description}
                    </p>
                    <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Cta11 };