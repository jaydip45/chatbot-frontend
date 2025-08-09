import { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../assets/style.css";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there!", sender: "agent", time: "1 minute" },
    { id: 2, text: "How can I help you?", sender: "agent", time: "1 minute" }
  ]);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "user",
      time: "just now"
    };
    setMessages((prev) => [...prev, newMessage]);
    // TODO: Send to backend
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Chatbot</span>
        <button onClick={onClose}>✖</button>
      </div>

      <MessageList messages={messages} />

      <MessageInput onSend={handleSend} />
    </div>
  );
}
