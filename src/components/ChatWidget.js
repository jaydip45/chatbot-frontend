import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import "../assets/style.css";
import { v4 as uuidv4 } from "uuid";
import { createUserRequest } from "../redux/app/appActions";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.app);

useEffect(() => {
    let sessionId = localStorage.getItem("chat_sessionId");
    let storedUserId = localStorage.getItem("chat_userId");

    if (!sessionId || !storedUserId) {
      sessionId = uuidv4();
      dispatch(createUserRequest({ sessionId }));
    } else {
      dispatch(createUserRequest({ sessionId, userId: storedUserId }));
    }
}, [dispatch]);
console.log('user :',user)


  return (
    <>
      {!isOpen && (
        <div className="chat-widget" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} user={user} />}
    </>
  );
}
