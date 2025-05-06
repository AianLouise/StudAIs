import {
    BatteryCharging,
    GitPullRequest,
    Layers,
    RadioTower,
    SquareKanban,
    WandSparkles,
} from "lucide-react";

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
    return (
        <section className="py-32 px-36">
            <div className="container">
                <div className="mb-10 md:mb-20">
                    <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
                        {heading}
                    </h2>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                            <p className="text-muted-foreground">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Feature43 };