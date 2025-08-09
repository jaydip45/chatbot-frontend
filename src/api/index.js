import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const createConversation = (data) =>
  axios.post(`${API_BASE}/conversation/add`, data);

export const sendMessage = (data) =>
  axios.post(`${API_BASE}/message/add`, data);
