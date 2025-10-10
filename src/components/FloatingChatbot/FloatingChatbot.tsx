"use client";
import React, { useState } from "react";
import Chatbot from "../chatbot/chatbot"; 
import { MessageCircle, X } from "lucide-react";

const FloatingChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
      >
        {open ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 animate-fadeIn">
          <Chatbot />
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;