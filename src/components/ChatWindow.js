import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket"; 
import { createConversationRequest, sendMessageRequest } from "../redux/app/appActions";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({ onClose }) {
  const dispatch = useDispatch();
  const { user, conversation, loading } = useSelector((state) => state.app);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

 useEffect(() => {
  if (!user?._id || !conversation?._id) return;

  socket.connect();
  socket.emit("joinConversation", conversation._id);

  socket.on("receiveMessage", (message) => {
    console.log("Socket message received:", message);
    setMessages((prev) => [...prev, message]);
  });

  return () => {
    socket.off("receiveMessage");
    socket.disconnect();
  };
}, [user?._id, conversation?._id]);

const handleSend = () => {
  if (!input.trim()) return;

  if (!conversation) {
    dispatch(createConversationRequest({ senderId: user._id, firstMessage: input }));
  } else {
    dispatch(sendMessageRequest({
      conversationId: conversation._id,
      senderId: user._id,
      text: input,
    }));

    socket.emit("sendMessage", {
      conversationId: conversation._id,
      senderId: user._id,
      text: input,
    });
  }

  setInput("");
};


  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Chatbot</span>
        <button onClick={onClose}>✖</button>
      </div>
      <MessageList messages={messages} />
      <MessageInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
