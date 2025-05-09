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
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
                    <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                        {heading}
                    </h3>
                    <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
                        {description}
                    </p>
                    <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
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