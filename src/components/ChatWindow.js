import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { createConversation, sendMessage } from "../api";
import "../assets/style.css";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const senderId = "USER123";

  useEffect(() => {
    const initConversation = async () => {
      try {
        const res = await createConversation({ senderId });
        console.log("Conversation response:", res.data);
        if (res.data._id) {
          setConversationId(res.data._id);
        }
      } catch (err) {
        console.error("Error creating conversation:", err);
      }
    };
    initConversation();
  }, [senderId]);

  const handleSend = async (text) => {
    if (!conversationId) {
      console.warn("No conversation ID yet");
      return;
    }

    const newMessageObj = {
      id: Date.now(),
      text,
      sender: "user",
      time: "just now"
    };

    setMessages((prev) => [...prev, newMessageObj]);

    try {
      await sendMessage({ conversationId, senderId, text });
    } catch (err) {
      console.error("Error sending message:", err);
    }
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
