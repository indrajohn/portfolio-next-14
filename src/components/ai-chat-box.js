"use client";
import Image from "next/image";
import { useChat, Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useLayoutProvider } from "@/context/myContext";

function AIChatBox() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  // const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const { chatBoxOpen, setChatBoxOpen } = useLayoutProvider();

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatBoxOpen) {
      inputRef?.current?.focus();
    }
  }, [chatBoxOpen]);
  return (
    <div className="z-50 fixed">
      <button
        className={`fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-lg transition-opacity 
        }`}
        onClick={() => setChatBoxOpen(true)}
      >
        <div className="flex flex-row gap-4 text-start">
          <div>
            <Bot size={42} />
          </div>
          <div>
            <p>Talk to me</p>
            <p>Question? i am here to help</p>
          </div>
        </div>
      </button>

      <div
        className={` bottom-0 right-0 w-full max-w-[400px] p-1 bg-white border-white border-2 ${
          chatBoxOpen ? "fixed" : "hidden"
        } `}
      >
        <button
          className={`mb-1 ms-auto block
        }`}
          onClick={() => setChatBoxOpen(false)}
        >
          <XCircle size={30} className="rounded-full" />
        </button>
        <div className="flex h-[300px] lg:h-[400px] flex-col rounded border shadow-xl z-50">
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
                  className={`rounded-md border px-3 py-2 ${
                    message.role === "assistant"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      a: ({ node, ref, ...props }) => (
                        <Link
                          {...props}
                          href={props.href ?? ""}
                          className="text-blue-600 hover:underline"
                        ></Link>
                      ),

                      p: ({ node, ...props }) => (
                        <p {...props} className="mt-3 first:mt-0"></p>
                      ),

                      ul: ({ node, ...props }) => (
                        <ul
                          {...props}
                          className="mt-3 list-inside list-disc first:mt-0"
                        ></ul>
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="mt-1 list-disc"></li>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && lastMessageIsUser && (
              <div className="flex mb-3 items-center me-5 justify-start ">
                <Bot className="mr-2 flex-none" />
                <div className="flex items-center rounded-md bg-white text-black border px-3 py-2 ">
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-wave mr-2"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-wave mr-2"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-wave"></div>
                </div>
              </div>
            )}
            {error && (
              <div
                className={`flex mb-3 items-center me-5 justify-start"
                }`}
              >
                <Bot className="mr-2 flex-none" />
                <div
                  className={`rounded-md border px-3 py-2 bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  Something went wrong. Please try again!
                </div>
              </div>
            )}
            {!error && messages.length === 0 && (
              <div className="flex flex-col h-full items-center justify-center text-center mx-8">
                <Bot size={28} />
                <p className="text-lg font-medium mb-8">
                  Send a message to start the AI Chat!
                </p>
                <p>
                  You can ask the chatbot any question about me and it will find
                  the relevant information on this website.
                </p>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex items-center justify-center w-10 flex-none"
            title="Clear Chat"
            onClick={() => setMessages([])}
          >
            <Trash size={28} />
          </button>
          <input
            value={input}
            ref={inputRef}
            onChange={handleInputChange}
            placeholder="Say Something..."
            className="grow border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={isLoading || input.length === 0}
            title={`Submit Message`}
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIChatBox;
