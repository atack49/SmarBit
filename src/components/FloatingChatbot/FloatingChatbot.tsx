'use client';
import React, { useState } from 'react';
import Chatbot from '../chatbot/chatbot';
import { MessageCircle } from 'lucide-react';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>();

  const recommendedQuestions = ['Ver dieta', 'Recuperar contraseña', 'Rutina', 'Favoritos', 'Cerrar sesión'];

  const handleOpenChat = (question?: string) => {
    if (question) {
      setInitialQuestion(question);
    }
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);

  };

  return (
    <>
    
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
       
          <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3 w-max">
            {recommendedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleOpenChat(q)}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
                className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out animate-fadeInUp"
              >
                {q}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleOpenChat()}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <MessageCircle size={28} />
          </button>
        </div>
      )}

      <div className={`fixed bottom-24 right-6 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 animate-fadeInUp' : 'opacity-0 pointer-events-none'}`}>
        <Chatbot initialQuestion={initialQuestion} onClose={handleCloseChat} />
      </div>
    </>
  );
};

export default FloatingChatbot;