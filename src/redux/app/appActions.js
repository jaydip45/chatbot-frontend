import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from "./appTypes";

export const fetchMessagesRequest = (conversationId) => ({
  type: FETCH_MESSAGES_REQUEST,
  payload: conversationId
});
export const fetchMessagesSuccess = (messages) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: messages
});
export const fetchMessagesFailure = (error) => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: error
});

export const sendMessageRequest = (messageData) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: messageData
});
export const sendMessageSuccess = (message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message
});
export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error
});
