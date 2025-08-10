import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export const createConversation = (data) =>
  axios.post(`${API_BASE}/conversation/add`, data);

export const sendMessage = (data) =>
  axios.post(`${API_BASE}/message/add`, data);

export const addUser = (data) =>
  axios.post(`${API_BASE}/add`, data);


//admin API

export const adminLogin = (data) =>
 axios.post(`${API_BASE}/login`, data);

export const fetchAdminConversations = (token) =>
  axios.get(`${API_BASE}/admin/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchAdminMessages = (conversationId, token) =>
  axios.get(`${API_BASE}/admin/messages/${conversationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchAdminUserInfo = (sessionId, token) =>
  axios.get(`${API_BASE}/admin/user/${sessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendAdminMessage = (data, token) =>
  axios.post(`${API_BASE}/admin/messages/send`, data, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });