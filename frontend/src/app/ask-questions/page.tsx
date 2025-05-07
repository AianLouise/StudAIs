"use client";

import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AskQuestions = () => {
    const [question, setQuestion] = useState(""); // User input
    const [messages, setMessages] = useState<any[]>([]); // Store conversation messages
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault(); // Prevent form refresh

        if (!question.trim()) {
            alert("Please enter a question.");
            return;
        }

        // Add user message to the conversation
        setMessages([...messages, { role: "user", content: question }]);

        setLoading(true); // Set loading state to true
        setError(null); // Reset error state

        try {
            // Make POST request to Django API
            const apiUrl = "http://127.0.0.1:8000/api/ask-question/"; // Django API URL
            const res = await axios.post(apiUrl, { question });

            // Extract and format the AI response content
            const aiResponse = res.data.choices?.[0]?.message?.content || "No response received.";

            // Add AI response to the conversation
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "ai", content: aiResponse }
            ]);

            // Clear the input field
            setQuestion("");
        } catch (err) {
            setError("Error occurred while fetching the response.");
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent adding a new line
            handleSubmit(); // Trigger the submit function
        }
    };

    return (
        <div className="flex flex-col p-4">
            {/* Header Section */}
            <Card className="border-b">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Welcome to Ask Questions</CardTitle>
                    <p className="text-muted-foreground">
                        Ask a question and get an instant response from our AI assistant.
                    </p>
                </CardHeader>
            </Card>

            {/* Chat Area */}
            <ScrollArea className="flex-grow p-6">
                <div className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {messages.length === 0 && (
                        <div className="text-center text-muted-foreground">No messages yet. Ask a question!</div>
                    )}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`grid ${
                                msg.role === "user" ? "justify-items-end" : "justify-items-start"
                            }`}
                        >
                            <div
                                className={`max-w-[60%] p-3 rounded-lg ${
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ node, ...props }) => (
                                            <p className="whitespace-pre-line" {...props} />
                                        ),
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Form */}
            <Card className="border-t">
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Textarea
                            placeholder="Ask a question..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyDown} // Add keydown event listener
                            rows={4}
                            disabled={loading}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "AI is typing..." : "Submit"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AskQuestions;