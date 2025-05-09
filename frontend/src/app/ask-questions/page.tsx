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
import { Copy, Edit2, Trash2, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    reactions?: string[];
}

const AskQuestions = () => {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!question.trim()) {
            toast.error("Please enter a question.");
            return;
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: question,
            reactions: []
        };

        setMessages([...messages, newMessage]);
        setLoading(true);
        setError(null);

        try {
            const apiUrl = "http://127.0.0.1:8000/api/ask-question/";
            const res = await axios.post(apiUrl, { question });

            const aiResponse = res.data.choices?.[0]?.message?.content || "No response received.";

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponse,
                reactions: []
            };

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            setQuestion("");
        } catch (err) {
            setError("Error occurred while fetching the response.");
            toast.error("Failed to get response from AI");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Message copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy message");
        }
    };

    const handleEdit = (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            setQuestion(message.content);
            setEditingMessageId(messageId);
        }
    };

    const handleUpdateMessage = () => {
        if (!editingMessageId) return;

        setMessages(messages.map(msg => 
            msg.id === editingMessageId 
                ? { ...msg, content: question }
                : msg
        ));
        setQuestion("");
        setEditingMessageId(null);
    };

    const handleDelete = (messageId: string) => {
        setMessages(messages.filter(msg => msg.id !== messageId));
        toast.success("Message deleted");
    };

    const handleReaction = (messageId: string, reaction: string) => {
        setMessages(messages.map(msg => {
            if (msg.id === messageId) {
                const reactions = msg.reactions || [];
                const hasReaction = reactions.includes(reaction);
                return {
                    ...msg,
                    reactions: hasReaction 
                        ? reactions.filter(r => r !== reaction)
                        : [...reactions, reaction]
                };
            }
            return msg;
        }));
    };

    const clearConversation = () => {
        setMessages([]);
        toast.success("Conversation cleared");
    };

    return (
        <div className="flex flex-col p-4">
            <Card className="border-b">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Welcome to Ask Questions</CardTitle>
                        <p className="text-muted-foreground">
                            Ask a question and get an instant response from our AI assistant.
                        </p>
                    </div>
                    <Button 
                        variant="destructive" 
                        onClick={clearConversation}
                        disabled={messages.length === 0}
                    >
                        Clear Conversation
                    </Button>
                </CardHeader>
            </Card>

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
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`grid ${
                                msg.role === "user" ? "justify-items-end" : "justify-items-start"
                            }`}
                        >
                            <div
                                className={`max-w-[60%] p-3 rounded-lg relative group ${
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    <div className="flex-1">
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
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(msg.content)}
                                            className="h-8 w-8"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        {msg.role === "user" && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(msg.id)}
                                                    className="h-8 w-8"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="h-8 w-8"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleReaction(msg.id, "👍")}
                                            className="h-8 w-8"
                                        >
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                {msg.reactions && msg.reactions.length > 0 && (
                                    <div className="flex gap-1 mt-2">
                                        {msg.reactions.map((reaction, index) => (
                                            <span key={index}>{reaction}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <Card className="border-t">
                <CardContent>
                    <form onSubmit={editingMessageId ? handleUpdateMessage : handleSubmit} className="space-y-4">
                        <Textarea
                            placeholder={editingMessageId ? "Edit your message..." : "Ask a question..."}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={4}
                            disabled={loading}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "AI is typing..." : editingMessageId ? "Update Message" : "Submit"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AskQuestions;