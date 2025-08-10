import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
   FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_USERINFO_REQUEST,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from './adminTypes';

export const adminLoginRequest = (payload) => ({
  type: ADMIN_LOGIN_REQUEST,
  payload,
});

export const adminLoginSuccess = (token) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: token,
});

export const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});

export const fetchConversationsRequest = () => ({
  type: FETCH_CONVERSATIONS_REQUEST,
});
export const fetchConversationsSuccess = (data) => ({
  type: FETCH_CONVERSATIONS_SUCCESS,
  payload: data,
});
export const fetchConversationsFailure = (error) => ({
  type: FETCH_CONVERSATIONS_FAILURE,
  payload: error,
});

// Messages
export const fetchMessagesRequest = (conversationId) => ({
  type: FETCH_MESSAGES_REQUEST,
  payload: conversationId,
});
export const fetchMessagesSuccess = (data) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: data,
});
export const fetchMessagesFailure = (error) => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: error,
});

// User Info
export const fetchUserInfoRequest = (sessionId) => ({
  type: FETCH_USERINFO_REQUEST,
  payload: sessionId,
});
export const fetchUserInfoSuccess = (data) => ({
  type: FETCH_USERINFO_SUCCESS,
  payload: data,
});
export const fetchUserInfoFailure = (error) => ({
  type: FETCH_USERINFO_FAILURE,
  payload: error,
});

// Send Message
export const sendMessageRequest = (messageData) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: messageData,
});
export const sendMessageSuccess = (data) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});
export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});