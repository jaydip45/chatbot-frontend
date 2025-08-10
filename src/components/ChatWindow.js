import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { createConversationRequest, sendMessageRequest } from "../redux/app/appActions";

export default function ChatWindow({ onClose }) {
  const dispatch = useDispatch();
  const { user, conversation, loading } = useSelector((state) => state.app);
  const [messages, setMessages] = useState([]);

  // Sync messages from Redux conversation
  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    if (!conversation) {
      dispatch(createConversationRequest({ senderId: user._id, firstMessage: text }));
    } else {
      dispatch(sendMessageRequest({
        conversationId: conversation._id,
        senderId: user._id,
        text,
      }));
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
