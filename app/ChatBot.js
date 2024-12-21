import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Paperclip,
  Camera,
  Mic,
  Phone,
  X,
  ExternalLink,
  Mail,
} from "lucide-react";
import Image from "next/image";
// Function to process text formatting
const formatText = (text) => {
  if (!text) return text;

  // Replace **text** with styled spans
  const boldText = text.replace(
    /\*\*(.*?)\*\*/g,
    '<span class="font-bold">$1</span>'
  );

  // Replace *text* with styled spans
  const formattedText = boldText.replace(
    /\*(.*?)\*/g,
    '<span class="italic">$1</span>'
  );

  return formattedText;
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: "welcome",
      content: {
        title: "Welcome to Auto Verdure Support",
        text: "How can I help you today?",
        options: [
          "Contact Information",
          "Technical Support",
          "General Inquiry",
        ],
      },
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    if (option === "Contact Information") {
      const contactInfo = {
        type: "contact",
        content: {
          title: "Contact Options",
          items: [
            {
              icon: Mail,
              title: "Email Support",
              text: "support@autoverdure.com",
              link: "mailto:support@autoverdure.com",
            },
            {
              icon: Phone,
              title: "Phone Support",
              text: "+91 9289671707",
              subtext: "Available 10:00 AM to 5:00 PM",
            },
            {
              icon: ExternalLink,
              title: "Contact Form",
              text: "www.autoverdure.com/contact",
              link: "http://www.autoverdure.com/contact",
            },
          ],
        },
        sender: "bot",
      };
      setMessages([...messages, { text: option, sender: "user" }, contactInfo]);
    } else if (option === "Technical Support") {
      const techSupport = {
        type: "quickOptions",
        content: {
          title: "Technical Support",
          text: "Please select the type of technical issue you're experiencing:",
          options: [
            {
              label: "Product Setup",
              description: "Help with initial setup and configuration",
            },
            {
              label: "Software Updates",
              description:
                "Issues with software updates or version compatibility",
            },
            {
              label: "Troubleshooting",
              description: "Help with specific error messages or problems",
            },
            {
              label: "Hardware Issues",
              description: "Problems with physical components or connectivity",
            },
          ],
        },
        sender: "bot",
      };
      setMessages([...messages, { text: option, sender: "user" }, techSupport]);
    } else if (option === "General Inquiry") {
      const generalInquiry = {
        type: "quickOptions",
        content: {
          title: "General Inquiry",
          text: "How can I assist you today?",
          options: [
            {
              label: "Product Information",
              description: "Learn more about our products and services",
            },
            {
              label: "Pricing & Plans",
              description:
                "Information about pricing, subscriptions, and packages",
            },
            {
              label: "Order Status",
              description: "Check the status of your existing order",
            },
            {
              label: "Request Demo",
              description: "Schedule a product demonstration",
            },
          ],
        },
        sender: "bot",
      };
      setMessages([
        ...messages,
        { text: option, sender: "user" },
        generalInquiry,
      ]);
    }
  };

  const handleQuickOptionClick = (label) => {
    // Add user's selection
    const newMessages = [...messages, { text: label, sender: "user" }];

    // Add response based on selection
    const response = {
      text: `Thank you for selecting "${label}". A support representative will assist you shortly. For faster assistance, please briefly describe your specific ${label.toLowerCase()} needs.`,
      sender: "bot",
    };

    setMessages([...newMessages, response]);
  };

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

      setTimeout(() => {
        setMessages([...newMessages, { text: data.message, sender: "bot" }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          text: "Sorry, I encountered an error. Please try again or use one of our direct contact methods.",
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

  const MessageContent = ({ text }) => {
    return <div dangerouslySetInnerHTML={{ __html: formatText(text) }} />;
  };

  const renderMessage = (message, index) => {
    if (message.type === "welcome") {
      return (
        <div className="bg-[#fffbf7] rounded-lg shadow-md p-4 max-w-[85%]">
          <h3 className="text-lg font-semibold text-primaryMain mb-2">
            {message.content.title}
          </h3>
          <p className="text-gray-600 mb-4">
            <MessageContent text={message.content.text} />
          </p>
          <div className="flex flex-col space-y-2">
            {message.content.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="text-left px-4 py-2 bg-gray-50 hover:bg-indigo-50 rounded-lg text-gray-700 hover:text-primaryMain transition-colors duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    const chatWindowVariants = {
      open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
      closed: {
        opacity: 0,
        scale: 0,
        y: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
    };

    const buttonVariants = {
      open: {
        opacity: 0,
        scale: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
      closed: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
    };

    if (message.type === "contact") {
      return (
        <div className="bg-[#fffbf7] rounded-lg shadow-md p-4 max-w-[85%]">
          <h3 className="text-lg font-semibold text-primaryMain mb-3">
            {message.content.title}
          </h3>
          <div className="space-y-4">
            {message.content.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-primaryMain" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-primaryMain hover:text-indigo-700 font-medium"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-gray-600">{item.text}</p>
                    )}
                    {item.subtext && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (message.type === "quickOptions") {
      return (
        <div className="bg-[#fffbf7] rounded-lg shadow-md p-4 max-w-[85%]">
          <h3 className="text-lg font-semibold text-primaryMain mb-2">
            {message.content.title}
          </h3>
          <p className="text-gray-600 mb-4">
            <MessageContent text={message.content.text} />
          </p>
          <div className="space-y-3">
            {message.content.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickOptionClick(option.label)}
                className="w-full flex flex-col text-left p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                <span className="font-medium text-gray-900">
                  {option.label}
                </span>
                <span className="text-sm text-gray-500">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md ${
          message.sender === "user"
            ? "bg-primaryMain text-white ml-auto"
            : "bg-[#fffbf7] text-gray-800"
        }`}
      >
        <MessageContent text={message.text} />
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 drop-shadow-lg z-50">
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          {/* Desktop container */}
          <div className="hidden sm:block w-[160px] h-[52px]">
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-primaryMain to-primaryMain text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 text-base font-medium w-full h-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with Us</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile container */}
          <div className="block sm:hidden w-[48px] h-[48px]">
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-primaryMain to-primaryMain text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full h-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-[95vw] max-w-md h-[600px] bg-[#fffbf7] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-primaryMain to-primaryMain text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Image
                      src="/logoav.png"
                      width={60}
                      height={60}
                      className="ml-3 mb-2 drop-shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Auto Verdure Support
                    </h3>
                    <p className="text-sm text-white/70">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[#fffbf7]/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {renderMessage(message, index)}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#fffbf7] p-3 rounded-xl shadow-md flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: 0.1,
                      }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#fffbf7] border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-2 pr-10 bg-gray-50 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={input.trim() === ""}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primaryMain disabled:text-gray-400 hover:text-indigo-500 disabled:hover:text-gray-400 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-primaryMain transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primaryMain transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primaryMain transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
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
