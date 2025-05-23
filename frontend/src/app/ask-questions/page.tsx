"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    Copy,
    Edit2,
    Trash2,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    Send,
    Bot,
    User,
    Sparkles,
    MessageSquare
} from "lucide-react";
import { toast } from "sonner";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    reactions?: string[];
    timestamp: Date;
    isStreaming?: boolean;
}

const AskQuestions = () => {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null); const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    // Suggested prompts for empty state
    const suggestedPrompts = [
        "Explain quantum computing in simple terms",
        "Write a creative story about AI",
        "Help me debug this JavaScript code",
        "What are the latest trends in web development?",
        "Explain machine learning concepts",
        "Create a meal plan for a week"
    ];

    const handleSuggestedPrompt = (prompt: string) => {
        setQuestion(prompt);
        textareaRef.current?.focus();
    };    // Check if user is near bottom of scroll area
    const checkScrollPosition = useCallback(() => {
        if (!scrollAreaRef.current) return;

        // Find the actual scrollable viewport inside ScrollArea
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (!viewport) return;

        const { scrollTop, scrollHeight, clientHeight } = viewport;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold

        setShouldAutoScroll(isNearBottom);
    }, []);

    // Handle scroll events to detect manual scrolling
    const handleScroll = useCallback((e: Event) => {
        e.stopPropagation();
        setIsUserScrolling(true);
        checkScrollPosition();

        // Clear the scrolling flag after a delay
        const timer = setTimeout(() => {
            setIsUserScrolling(false);
        }, 150);

        return () => clearTimeout(timer);
    }, [checkScrollPosition]);

    // Set up scroll listener on the actual viewport
    useEffect(() => {
        if (!scrollAreaRef.current) return;

        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (!viewport) return;

        viewport.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            viewport.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Auto-scroll to bottom when new messages arrive (only if user is at bottom)
    useEffect(() => {
        if (shouldAutoScroll && !isUserScrolling) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        // Always scroll to bottom if the last message is from the user
        if (messages.length > 0 && messages[messages.length - 1].role === "user") {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading, shouldAutoScroll, isUserScrolling]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [question]);

    // Simulate streaming response
    const simulateStreaming = useCallback(async (fullResponse: string, messageId: string) => {
        const words = fullResponse.split(' ');
        let currentContent = '';

        for (let i = 0; i < words.length; i++) {
            currentContent += (i > 0 ? ' ' : '') + words[i];

            setMessages(prev => prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, content: currentContent, isStreaming: i < words.length - 1 }
                    : msg
            ));

            // Add small delay for streaming effect
            await new Promise(resolve => setTimeout(resolve, 15));
        }
    }, []);

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
            reactions: [],
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setLoading(true);
        setIsTyping(true);
        setError(null);
        setQuestion("");

        // Scroll to bottom after user sends a message
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/ask-question/`;
            const res = await axios.post(apiUrl, { question });

            const aiResponse = res.data.choices?.[0]?.message?.content || "No response received.";

            const aiMessageId = (Date.now() + 1).toString();
            const aiMessage: Message = {
                id: aiMessageId,
                role: "ai",
                content: "",
                reactions: [],
                timestamp: new Date(),
                isStreaming: true
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);

            // Start streaming simulation
            await simulateStreaming(aiResponse, aiMessageId);

        } catch {
            setError("Error occurred while fetching the response.");
            toast.error("Failed to get response from AI");
        } finally {
            setLoading(false);
            setIsTyping(false);
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
        } catch {
            toast.error("Failed to copy message");
        }
    };

    const handleEdit = (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            setQuestion(message.content);
            setEditingMessageId(messageId);
        }
    }; const handleUpdateMessage = async () => {
        if (!editingMessageId || !question.trim()) return;

        const updatedMessages = messages.map(msg =>
            msg.id === editingMessageId
                ? { ...msg, content: question, timestamp: new Date() }
                : msg
        );

        setMessages(updatedMessages);

        // Re-generate AI response for the updated message
        const userMessage = updatedMessages.find(msg => msg.id === editingMessageId);
        if (userMessage) {
            setLoading(true);
            setIsTyping(true);

            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/ask-question/`;
                const res = await axios.post(apiUrl, { question: userMessage.content });
                const aiResponse = res.data.choices?.[0]?.message?.content || "No response received.";

                // Find and update the next AI message
                const messageIndex = updatedMessages.findIndex(msg => msg.id === editingMessageId);
                if (messageIndex !== -1 && messageIndex + 1 < updatedMessages.length) {
                    const nextMessage = updatedMessages[messageIndex + 1];
                    if (nextMessage.role === "ai") {
                        await simulateStreaming(aiResponse, nextMessage.id);
                    }
                }
            } catch {
                toast.error("Failed to regenerate AI response");
            } finally {
                setLoading(false);
                setIsTyping(false);
            }
        }

        setQuestion("");
        setEditingMessageId(null);
        toast.success("Message updated");
    };

    const regenerateResponse = async (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (!message || message.role !== "ai") return;

        // Find the previous user message
        const messageIndex = messages.findIndex(m => m.id === messageId);
        const userMessage = messages[messageIndex - 1];

        if (!userMessage || userMessage.role !== "user") return;

        setLoading(true);
        setIsTyping(true);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/ask-question/`;
            const res = await axios.post(apiUrl, { question: userMessage.content });
            const aiResponse = res.data.choices?.[0]?.message?.content || "No response received.";

            // Reset the AI message content and start streaming
            setMessages(prev => prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, content: "", isStreaming: true, timestamp: new Date() }
                    : msg
            ));

            await simulateStreaming(aiResponse, messageId);
            toast.success("Response regenerated");
        } catch {
            toast.error("Failed to regenerate response");
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
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
    }; return (
        <div className="flex flex-col h-full bg-gray-50/30">
            {/* Header */}
            <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
                            <p className="text-sm text-gray-500">Ask anything, get instant answers</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {messages.length} messages
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearConversation}
                            disabled={messages.length === 0}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Clear
                        </Button>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea
                    ref={scrollAreaRef}
                    className="h-full"
                >
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {messages.length === 0 && (
                            <div className="text-center py-12">
                                <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <MessageSquare className="h-10 w-10 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                                    Ask me anything! I&apos;m here to help with questions, explanations, creative writing, and more.
                                </p>

                                {/* Suggested Prompts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                                    {suggestedPrompts.map((prompt, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="text-left h-auto p-4 justify-start hover:bg-blue-50 hover:border-blue-200"
                                            onClick={() => handleSuggestedPrompt(prompt)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm">{prompt}</span>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            {messages.map((msg, index) => {
                                const isUser = msg.role === "user";
                                const showAvatar = index === 0 || messages[index - 1]?.role !== msg.role;
                        
                                return (
                                    <div key={msg.id} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            {showAvatar && (
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-2 ${isUser
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                                </div>
                                            )}
                                        </div>
                        
                                        {/* Message Content */}
                                        <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : ''}`}>
                                            <div className={`group relative inline-block max-w-full ${isUser ? 'ml-auto' : 'mr-auto'}`}>
                                                <div className={`px-4 py-3 rounded-2xl shadow-sm ${isUser
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-gray-200 text-gray-900'
                                                    } ${msg.isStreaming ? 'animate-pulse' : ''}`}>
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({ children }) => (
                                                                // Always align text left, even for user messages
                                                                <p className="whitespace-pre-wrap break-words mb-2 last:mb-0 text-left">{children}</p>
                                                            ),
                                                            h1: ({ children }) => (
                                                                <h1 className={`text-xl font-bold mb-2 ${isUser ? 'text-white' : 'text-gray-900'} text-left`}>{children}</h1>
                                                            ),
                                                            h2: ({ children }) => (
                                                                <h2 className={`text-lg font-semibold mb-2 ${isUser ? 'text-white' : 'text-gray-900'} text-left`}>{children}</h2>
                                                            ),
                                                            h3: ({ children }) => (
                                                                <h3 className={`text-md font-medium mb-2 ${isUser ? 'text-white' : 'text-gray-900'} text-left`}>{children}</h3>
                                                            ),
                                                            code: ({ children, className }) => {
                                                                const isInline = !className;
                                                                return isInline ? (
                                                                    <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isUser ? 'bg-blue-700 text-blue-100' : 'bg-gray-100 text-gray-800'
                                                                        }`}>{children}</code>
                                                                ) : (
                                                                    <code className="block">{children}</code>
                                                                );
                                                            },
                                                            pre: ({ children }) => (
                                                                <pre className={`p-4 rounded-lg text-sm overflow-x-auto font-mono my-3 ${isUser ? 'bg-blue-700 text-blue-100' : 'bg-gray-900 text-gray-100'
                                                                    } text-left`}>{children}</pre>
                                                            ),
                                                            ul: ({ children }) => (
                                                                <ul className="list-disc list-inside space-y-1 mb-2 text-left">{children}</ul>
                                                            ),
                                                            ol: ({ children }) => (
                                                                <ol className="list-decimal list-inside space-y-1 mb-2 text-left">{children}</ol>
                                                            ),
                                                            li: ({ children }) => (
                                                                <li className="mb-1">{children}</li>
                                                            ),
                                                            blockquote: ({ children }) => (
                                                                <blockquote className={`border-l-4 pl-4 py-2 my-2 italic ${isUser ? 'border-blue-300 text-blue-100' : 'border-gray-300 text-gray-600'
                                                                    } text-left`}>{children}</blockquote>
                                                            ),
                                                            strong: ({ children }) => (
                                                                <strong className="font-semibold">{children}</strong>
                                                            ),
                                                            em: ({ children }) => (
                                                                <em className="italic">{children}</em>
                                                            ),
                                                            table: ({ children }) => (
                                                                <table className={`w-full border-collapse border my-3 ${isUser ? 'border-blue-300' : 'border-gray-300'
                                                                    } text-left`}>{children}</table>
                                                            ),
                                                            th: ({ children }) => (
                                                                <th className={`border p-2 font-semibold text-left ${isUser ? 'border-blue-300 bg-blue-700' : 'border-gray-300 bg-gray-100'
                                                                    }`}>{children}</th>
                                                            ),
                                                            td: ({ children }) => (
                                                                <td className={`border p-2 ${isUser ? 'border-blue-300' : 'border-gray-300'
                                                                    } text-left`}>{children}</td>
                                                            )
                                                        }}
                                                    >
                                                        {msg.content || (msg.isStreaming ? "AI is thinking..." : "")}
                                                    </ReactMarkdown>
                                                </div>
                        
                                                {/* Action Buttons */}
                                                <div className={`absolute top-1 ${isUser ? 'left-1' : 'right-1'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    <div className="flex gap-1 bg-white rounded-lg shadow-lg border p-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => copyToClipboard(msg.content)}
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                        {isUser && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7"
                                                                    onClick={() => handleEdit(msg.id)}
                                                                >
                                                                    <Edit2 className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7"
                                                                    onClick={() => handleDelete(msg.id)}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </>
                                                        )}
                                                        {!isUser && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7"
                                                                onClick={() => regenerateResponse(msg.id)}
                                                                disabled={loading}
                                                            >
                                                                <RefreshCw className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => handleReaction(msg.id, "👍")}
                                                        >
                                                            <ThumbsUp className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => handleReaction(msg.id, "👎")}
                                                        >
                                                            <ThumbsDown className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                        
                                                {/* Reactions */}
                                                {msg.reactions && msg.reactions.length > 0 && (
                                                    <div className={`flex gap-1 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                        {msg.reactions.map((reaction, idx) => (
                                                            <span key={idx} className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                                                                {reaction}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                        
                                                {/* Timestamp */}
                                                <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                                                    {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        
                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div ref={chatEndRef} />
                    </div>
                </ScrollArea>
            </div>

                        {/* Input Area */}
            <div className="border-t bg-white/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto p-4">
                    <form onSubmit={editingMessageId ? (e => { e.preventDefault(); handleUpdateMessage(); }) : handleSubmit} className="relative">
                        <div className="flex items-end gap-2">
                            <div className="flex-1 relative mt-2"> {/* Added mt-2 for vertical space */}
                                <Textarea
                                    ref={textareaRef}
                                    placeholder={editingMessageId ? "Edit your message..." : "Type your message..."}
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={loading}
                                    className="resize-none pr-12 min-h-[48px] py-3 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 overflow-hidden" // Removed max-h-32, added overflow-hidden
                                    rows={1}
                                    style={{ paddingRight: "3rem" }} // Ensure space for button
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={loading || !question.trim()}
                                    className="absolute bottom-2 right-2 h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            {editingMessageId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setEditingMessageId(null);
                                        setQuestion("");
                                    }}
                                    className="h-12 px-4"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                    {editingMessageId && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
                            <Edit2 className="h-4 w-4" />
                            Editing message - Press Enter to update or click Cancel
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AskQuestions;