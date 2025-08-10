import { useEffect, useRef } from "react";
import "../assets/style.css";

export default function MessageList({ messages }) {
  const listRef = useRef();

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message-list" ref={listRef}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.senderType === "user" ? "user" : "agent"}`}
        >
          <div className="text">{msg.text}</div>
          <div className="time">    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
