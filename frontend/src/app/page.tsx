// pages/landing.js
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to StudAIs</h1>
        <p className="text-xl">Ask questions, summarize notes, quiz yourself – all powered by AI.</p>
      </header>

      {/* Features Section */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">AI-Powered Quizzes</h3>
            <p>Create quizzes with tailored questions to test your knowledge.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Summarize Notes</h3>
            <p>Let StudAIs summarize your notes for easy review.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">AI Assistance</h3>
            <p>Get quick help with explanations and study material.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to level up your learning?</h2>
        <Link href="/login">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-6 rounded-md text-lg">
            Start Learning
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p>&copy; 2025 StudAIs. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
