import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const QuizzesPage = () => {
    return (
        <div className="flex flex-1 items-start justify-center w-full h-full pt-16">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Quiz Yourself</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-gray-700">
                        Test your knowledge with AI-generated quizzes tailored to your study materials.
                    </p>
                    {/* Replace below with your quiz form or quiz list */}
                    <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                        type="button"
                    >
                        Start Quiz
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizzesPage;