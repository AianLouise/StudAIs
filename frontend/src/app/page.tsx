"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-20">
                <div className="container mx-auto text-center px-6">
                    <h1 className="text-5xl font-bold mb-6">Welcome to StudAIs</h1>
                    <p className="text-lg mb-8">
                        Ask questions, summarize notes, quiz yourself – all powered by AI.
                    </p>
                    <Link href="/register">
                        <Button className="bg-yellow-500 text-black hover:bg-yellow-600 py-3 px-8 text-lg">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-100">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://placehold.co/100x100"
                                alt="AI-Powered Quizzes"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                AI-Powered Quizzes
                            </h3>
                            <p className="text-slate-600">
                                Create quizzes with tailored questions to test your knowledge.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://placehold.co/100x100"
                                alt="Summarize Notes"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                Summarize Notes
                            </h3>
                            <p className="text-slate-600">
                                Let StudAIs summarize your notes for easy review.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://placehold.co/100x100"
                                alt="AI Assistance"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                AI Assistance
                            </h3>
                            <p className="text-slate-600">
                                Get quick help with explanations and study material.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">
                        See StudAIs in Action
                    </h2>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                        <img
                            src="https://placehold.co/600x400"
                            alt="StudAIs Showcase"
                            className="rounded-lg shadow-md"
                        />
                        <div className="text-left max-w-lg">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                Transform Your Study Experience
                            </h3>
                            <p className="text-slate-600 mb-6">
                                StudAIs helps you stay organized, learn efficiently, and achieve
                                your academic goals with ease.
                            </p>
                            <Link href="/register">
                                <Button className="bg-slate-700 text-white hover:bg-slate-800 py-3 px-8 text-lg">
                                    Start Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-lg mb-8">
                        Join thousands of students who are transforming their study habits with
                        StudAIs.
                    </p>
                    <Link href="/register">
                        <Button className="bg-yellow-500 text-black hover:bg-yellow-600 py-3 px-8 text-lg">
                            Register Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;