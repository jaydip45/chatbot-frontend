import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Update to your backend

export default socket;
