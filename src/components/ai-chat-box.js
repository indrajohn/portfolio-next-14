"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatWithAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (chatBoxOpen) {
      inputRef?.current?.focus();
    }
  }, [chatBoxOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.body) {
        throw new Error("No response body from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let botMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botMessage += chunk;

        try {
          // Parse JSON chunks and extract the `response` key
          const parsed = JSON.parse(botMessage);
          botMessage = parsed.response;
        } catch (err) {
          // Handle partial JSON parsing errors during streaming
          console.error("JSON parsing error (partial):", err);
        }

        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: botMessage,
          };
          return updatedMessages;
        });
      }
    } catch (err) {
      console.error("Error in streaming response:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-50 fixed">
      {/* Chat Open Button */}
      <button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
        onClick={() => setChatBoxOpen(true)}
        aria-label="Open AI Chat"
      >
        <div className="flex items-center gap-4 text-start">
          <Bot size={42} />
          <div>
            <p className="font-bold text-lg">Chat with AI Bot!</p>
            <p className="text-sm">Ask me anything about this site!</p>
          </div>
        </div>
      </button>

      {/* Chatbox */}
      <div
        className={`bottom-0 right-0 w-full max-w-[400px] p-1 rounded-lg bg-white shadow-xl ${
          chatBoxOpen ? "fixed" : "hidden"
        }`}
      >
        <div className="p-3 bg-teal-600 text-white flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot size={28} />
            <p className="font-bold">AI Assistant</p>
          </div>
          <button
            className="hover:opacity-80"
            onClick={() => setChatBoxOpen(false)}
            aria-label="Close Chat"
          >
            <XCircle size={28} />
          </button>
        </div>

        <div className="flex h-[300px] lg:h-[400px] flex-col rounded-lg border overflow-hidden">
          <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-3 items-center ${
                  message.role === "assistant"
                    ? "me-5 justify-start"
                    : "ms-5 justify-end"
                }`}
              >
                {message.role === "assistant" && (
                  <Bot className="mr-2 flex-none" />
                )}
                <div
                  className={`rounded-lg px-4 py-2 shadow-md ${
                    message.role === "assistant"
                      ? "bg-teal-100 text-gray-900"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex mb-3 items-center justify-start">
                <Bot className="mr-2 flex-none" />
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  <div className="loader">...</div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex items-center justify-center w-10 flex-none"
            title="Clear Chat"
            onClick={() => setMessages([])}
            aria-label="Clear Chat"
          >
            <Trash size={28} />
          </button>
          <input
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            className="grow border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={isLoading || input.length === 0}
            title="Send Message"
            aria-label="Send Message"
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
