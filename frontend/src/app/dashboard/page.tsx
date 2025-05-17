import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Dashboard = () => {
    return (
        <div className="flex flex-1 flex-col w-full">
            <div className="container flex flex-1 flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* Welcome Message */}
                    <div className="px-4 lg:px-6 w-full">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome to StudAIs Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Ask questions, summarize notes, quiz yourself – all powered by AI.<br />
                            Transform your study experience today.
                        </p>
                    </div>

                    {/* StudAIs Feature Cards */}
                    <div className="px-4 lg:px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ask AI Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Get instant answers to your study questions powered by advanced AI.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Summarize Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Upload your notes and let AI generate concise summaries for quick revision.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Yourself</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Test your knowledge with AI-generated quizzes tailored to your materials.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;