import React, { useState } from 'react';
import { Send, MessagesSquare, UserRoundPen } from 'lucide-react'; // MessageCircle for chat icon
import { motion } from 'framer-motion'; // For animations
import { RiCameraLine } from 'react-icons/ri'; // Icons from react-icons
import { CgAttachment } from "react-icons/cg";
import { IoMicOutline, IoSendSharp  } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const ChatBot = () => {
  const [messages, setMessages] = useState([ 
    { text: "Hi there!👋 Welcome to Auto Verdure. How can I assist you today?", sender: "bot" },
    { text: "Have a question or concern? Our customer support team is here to help! Feel free to ask anything, and I'll do my best to assist you.", sender: "bot" },
  ]);
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
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none transition-transform transform hover:scale-110 flex items-center z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessagesSquare size={24} />
          <span className="ml-2 hidden sm:block">Talk to an Expert</span>
        </motion.button>
      )}

      {/* Chatbot container, visible only when isOpen is true */}
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 w-[300px] sm:w-[380px] h-[70vh] sm:h-[480px] bg-white rounded-lg shadow-lg flex flex-col z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Header with close button */}
          <div className="p-4 bg-purple-500 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-300 rounded-full"></div> {/* Placeholder for profile picture */}
              <div>
                <h3 className="text-lg font-semibold">Auto Verdure Support</h3>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-white p-1 rounded-full hover:scale-110 focus:outline-none">
                <MdOutlineCall size={20} />
              </button>
              <button
                onClick={() => setIsOpen(false)} // Close chat when clicked
                className="text-white hover:text-gray-300 focus:outline-none transition-transform transform hover:scale-110 ml-4"
              >
                <RxCross1/>

              </button>
            </div>
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
          <div className="flex items-center bg-purple-500 p-3 space-x-2 rounded-b-lg">
            {/* Input box with send button inside */}
            <div className="relative flex items-center bg-white rounded-full pl-4 pr-10 w-full h-10 max-w-lg">
              <input
                type="text"
                placeholder="Type Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 outline-none border-none text-gray-700 rounded-full"
              />
              <motion.button
                onClick={sendMessage}
                className="absolute right-2 text-gray-400 hover:text-purple-600 focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoSendSharp size={20} />
              </motion.button>
            </div>

            {/* Additional icons */}
            <button className="text-white p-1 rounded-full hover:bg-purple-300 focus:outline-none">
              <CgAttachment size={20} />
            </button>
            <button className="text-white p-1 rounded-full hover:bg-purple-300 focus:outline-none">
              <RiCameraLine size={20} />
            </button>
            <button className="text-white p-1 rounded-full hover:bg-purple-300 focus:outline-none">
              <IoMicOutline size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;
