"use client";

import { useEffect } from "react"; // Import useEffect
import { Footer7 } from "@/components/footer7";
import { Hero1 } from "@/components/landing-hero1";
import { Navbar1 } from "@/components/navbar";
import { Feature43 } from "@/components/feature43";
import { Testimonial4 } from "@/components/testimonial4";
import { Cta11 } from "@/components/cta11";

const LandingPage = () => {
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Navbar */}
            <Navbar1 />

            {/* Hero Section */}
            <Hero1 />

            {/* Features Section */}
            <Feature43 />

            {/* Testimonials Section */}
            <Testimonial4 />

            {/* Call-to-Action Section */}
            <Cta11 />

            {/* Footer */}
            <Footer7 />
        </div>
    );
};

export default LandingPage;