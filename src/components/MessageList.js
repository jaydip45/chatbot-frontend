import { useEffect, useRef } from "react";

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
          className={`message ${msg.sender === "user" ? "user" : "agent"}`}
        >
          <div className="text">{msg.text}</div>
          <div className="time">{msg.time}</div>
        </div>
      ))}
    </div>
  );
}
