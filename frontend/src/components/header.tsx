import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="bg-slate-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <Link href="/">
                    <img
                        src="https://placehold.co/150x50"
                        alt="StudAIs Logo"
                        className="h-10"
                    />
                </Link>

                {/* Navigation */}
                <nav className="flex space-x-4">
                    <Link href="/login">
                        <Button className="bg-slate-700 text-white hover:bg-slate-800">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                            Register
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;