import React, { useState } from 'react';
import { Send, MessagesSquare, UserRoundPen } from 'lucide-react'; // MessageCircle for chat icon
import { motion } from 'framer-motion'; // For animations

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control chatbot visibility

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('/api/botresp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages([...newMessages, { text: data.message, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { text: 'Sorry, there was an error. Please try again.', sender: 'bot' }]);
    }
  };

  return (
    <>
      {/* Floating button to open the chatbot */}
      {!isOpen && (
      <motion.button
        onClick={() => setIsOpen(true)} // Toggle visibility when clicked
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none transition-transform transform hover:scale-110 flex items-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessagesSquare size={24} />
        <span className="ml-2">Talk to an Expert</span>
      </motion.button>
    )}

      {/* Chatbot container, visible only when isOpen is true */}
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Header with close button */}
          <div className="p-4 bg-purple-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Auto Verdure Support</h3>
            <button
              onClick={() => setIsOpen(false)} // Close chat when clicked
              className="text-white hover:text-gray-300 focus:outline-none transition-transform transform hover:scale-110"
            >
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <motion.span
                  className={`inline-block p-3 rounded-lg shadow ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 border rounded-l-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                placeholder="Type a message..."
              />
              <motion.button
                onClick={sendMessage}
                className="bg-purple-600 text-white p-2 rounded-r-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;
