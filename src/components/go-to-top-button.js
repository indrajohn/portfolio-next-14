"use client";
import { useEffect, useState } from "react";
import AIChatBox from "./ai-chat-box";

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* <button
        className={`fixed bottom-16 right-4 bg-gray-500 text-white px-4 py-2 rounded-lg transition-opacity ${
          showButton ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToTop}
      >
        <svg
          className="h-5 w-5 text-white inline-block mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        Top
      </button> */}
      <AIChatBox />
    </div>
  );
}

export default GoToTopButton;
