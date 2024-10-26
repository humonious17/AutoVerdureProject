'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import './TalkToExpertButton.css';

const TalkToExpertButton = () => {
    // code to change pulsing button to chat box
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const boxRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setIsBoxVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleBox = () => {
        fetch('/api/botresp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: 'ping'})
        });
        setIsBoxVisible(!isBoxVisible);
    };

    // code to handle messages
    const [messages, setMessages] = useState([
        { sender: 'bot', content: 'Hello! How can I assist you today?' }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [response, setResponse] = useState(null);

    const addMessage = async (first, second) => {
        if (first === null) {
            setMessages([...messages, second]);
        } else {
            setMessages([...messages, first, second]);
        }
        
    };

    const getBotResponse = async (userMessage) => {
        const res = await fetch('/api/botresp', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message:userMessage}),
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await res.json();
        return result.message;
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const userMessage = newMessage;
            setNewMessage('');

            await addMessage({ sender: 'user', content: userMessage }, { sender: 'bot', content: 'Typing...' });
            try {
                const botResponse = await getBotResponse(userMessage); // Replace with actual server call

                // Add bot's message to the state
                addMessage({ sender: 'user', content: userMessage }, { sender: 'bot', content: botResponse });
            } catch (error) {
                console.error('Error getting bot response:', error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            <button
                ref={buttonRef}
                className={`talk-to-expert-button${isBoxVisible ? '.no-pulse' : ''}`}
                onClick={toggleBox}
            >
                Talk to an expert
            </button>
            {isBoxVisible && (
                <div ref={boxRef} className="popup-box">
                    <div className="popup-box-header">
                        <div class="profile-picture"></div>
                        <span class="name">Auto Verdure Support</span>
                        <div class="icon call-icon">
                            <Image alt="phone"  loading="lazy" width="40" height="40" decoding="async" data-nImage="1" src="/telephone.svg" style={{background: 'rgb(154 92 245 / var(--tw-bg-opacity))'}}></Image>
                        </div>
                        <div class="icon menu-icon">
                            <Image alt="phone" loading="lazy" width="40" height="40" decoding="async" data-nImage="1" src="/hamburger.svg" style={{ background: 'rgb(154 92 245 / var(--tw-bg-opacity))' }}></Image>
                        </div>
                    </div>
                    <div className="popup-box-chat">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.content}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="popup-message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message"
                            onKeyDown={handleKeyPress}
                        />
                        <button onClick={handleSendMessage}>
                            <Image alt="send" loading="lazy" width="35" height="35" decoding="async" data-nImage="1" src="/rightArr.svg" style={{ background: 'rgb(154 92 245 / var(--tw-bg-opacity))' }}></Image>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TalkToExpertButton;