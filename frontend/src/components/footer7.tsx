import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const sections = [
    {
        title: "Product",
        links: [
            { name: "Overview", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Features", href: "#" },
            { name: "FAQs", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Help Center", href: "#" },
            { name: "Community", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    },
];

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
}

const Footer7 = ({
    logo = {
        url: "/",
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyYWluLWNpcmN1aXQtaWNvbiBsdWNpZGUtYnJhaW4tY2lyY3VpdCI+PHBhdGggZD0iTTEyIDVhMyAzIDAgMSAwLTUuOTk3LjEyNSA0IDQgMCAwIDAtMi41MjYgNS43NyA0IDQgMCAwIDAgLjU1NiA2LjU4OEE0IDQgMCAxIDAgMTIgMThaIi8+PHBhdGggZD0iTTkgMTNhNC41IDQuNSAwIDAgMCAzLTQiLz48cGF0aCBkPSJNNi4wMDMgNS4xMjVBMyAzIDAgMCAwIDYuNDAxIDYuNSIvPjxwYXRoIGQ9Ik0zLjQ3NyAxMC44OTZhNCA0IDAgMCAxIC41ODUtLjM5NiIvPjxwYXRoIGQ9Ik02IDE4YTQgNCAwIDAgMS0xLjk2Ny0uNTE2Ii8+PHBhdGggZD0iTTEyIDEzaDQiLz48cGF0aCBkPSJNMTIgMThoNmEyIDIgMCAwIDEgMiAydjEiLz48cGF0aCBkPSJNMTIgOGg4Ii8+PHBhdGggZD0iTTE2IDhWNWEyIDIgMCAwIDEgMi0yIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMyIgcj0iLjUiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjMiIHI9Ii41Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMSIgcj0iLjUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjgiIHI9Ii41Ii8+PC9zdmc+",
        alt: "StudAIs Logo",
        title: "StudAIs",
    },
}: Footer7Props) => {
    return (
        <section className="py-32 px-20">
            <div className="container">
                <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            <a href={logo.url}>
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="h-8"
                                />
                            </a>
                            <h2 className="text-xl font-semibold">{logo.title}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering students with AI-driven tools to enhance learning, simplify studying, and achieve academic success.
                        </p>
                        <ul className="flex items-center space-x-6 text-muted-foreground">
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <Instagram className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <Facebook className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <Twitter className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <Linkedin className="size-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-6 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
                    <p>© 2025 StudAIs. All rights reserved.</p>
                    <ul className="flex justify-center gap-4 lg:justify-start">
                        <li className="hover:text-primary">
                            <a href="#">Terms and Conditions</a>
                        </li>
                        <li className="hover:text-primary">
                            <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export { Footer7 };