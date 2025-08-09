import api from "./api";

export const addUser = (payload) => api.post("/add", payload);
export const getUsers = () => api.get("/users");
export const newConversation = (payload) => api.post("/conversation/add", payload);
export const getConversation = (payload) => api.post("/conversation/get", payload);
export const newMessage = (payload) => api.post("/message/add", payload);
export const getMessages = (id) => api.get(`/message/get/${id}`);