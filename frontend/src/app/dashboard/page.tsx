"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Head from "next/head";
import Sidebar from "@/components/sidebar"; // Import Sidebar component

const DashboardPage = () => {
    const [recentActivities, setRecentActivities] = useState<{ title: string; description: string }[]>([]);
    const [progressData, setProgressData] = useState<{ quizzesCompleted: number; questionsAsked: number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch recent activities and progress data from backend API
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/dashboard`)
            .then((response) => {
                setRecentActivities(response.data.recentActivities);
                setProgressData(response.data.progress);
            })
            .catch((err) => {
                console.error("Error fetching dashboard data:", err);
            });
    }, []);

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 min-h-screen p-10">
                    {/* Grid Layout for Recent Activities and Your Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left side: Recent Activities */}
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <Card key={index} className="mb-4 shadow-lg">
                                        <CardHeader>
                                            <CardTitle>{activity.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{activity.description}</p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p>No recent activities available.</p>
                            )}
                        </div>

                        {/* Right side: Progress Overview */}
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
                            {progressData ? (
                                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium">Quizzes Completed</h3>
                                        <div
                                            className="h-2 bg-blue-500 rounded"
                                            style={{ width: `${(progressData.quizzesCompleted / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium">Questions Asked</h3>
                                        <div
                                            className="h-2 bg-green-500 rounded"
                                            style={{ width: `${(progressData.questionsAsked / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading your progress...</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-4 mt-6">
                        <Button onClick={() => router.push("/ask-questions")} className="flex-1">
                            Ask Questions
                        </Button>
                        <Button onClick={() => router.push("/summarize-notes")} className="flex-1">
                            Summarize Notes
                        </Button>
                        <Button onClick={() => router.push("/quiz")} className="flex-1">
                            Take Quiz
                        </Button>
                    </div>

                    {/* Profile Link */}
                    <div className="text-center mt-4">
                        <Button onClick={() => router.push("/profile")} variant="outline" className="w-full">
                            Go to Profile
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
