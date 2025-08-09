import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "../assets/style.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="chat-widget" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}
