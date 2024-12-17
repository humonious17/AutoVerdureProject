import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  MessageCircle,
  Send,
  Paperclip,
  Camera,
  Mic,
  Phone,
  X,
  Smile,
} from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi there! 👋 Welcome to Auto Verdure Support. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const controls = useAnimation();

  // Smooth scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/botresp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Simulate typing delay for more natural interaction
      setTimeout(() => {
        setMessages([...newMessages, { text: data.message, sender: "bot" }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          text: "Oops! Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const chatbotVariants = {
    closed: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="fixed bottom-6 right-3 drop-shadow-md z-50 flex items-center justify-center">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-indigo-600 to-primaryMain text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="hidden sm:block text-sm font-medium">
              Chat with Us
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-[95vw] max-w-md h-[75vh] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            variants={chatbotVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-primaryMain text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Auto Verdure Support
                  </h3>
                  <p className="text-xs text-white/70">Chatbot</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 rounded-full p-2"
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: message.sender === "user" ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md ${
                      message.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-3 rounded-2xl shadow-md flex space-x-1">
                    {[1, 2, 3].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-2 pr-10 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={input.trim() === ""}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 disabled:text-gray-400 hover:text-indigo-300"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex space-x-2">
                  {[
                    { icon: Paperclip, color: "text-gray-500" },
                    { icon: Camera, color: "text-gray-500" },
                    { icon: Mic, color: "text-gray-500" },
                  ].map(({ icon: Icon, color }, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`${color} hover:text-indigo-600 transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
