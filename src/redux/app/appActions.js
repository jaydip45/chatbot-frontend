import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
} from './appTypes';

// Conversation
export const createConversationRequest = (payload) => ({
    type: CREATE_CONVERSATION_REQUEST,
    payload
});

export const createConversationSuccess = (data) => ({
    type: CREATE_CONVERSATION_SUCCESS,
    payload: data
});

export const createConversationFailure = (error) => ({
    type: CREATE_CONVERSATION_FAILURE,
    payload: error
});

// Message
export const sendMessageRequest = (payload) => ({
    type: SEND_MESSAGE_REQUEST,
    payload
});

export const sendMessageSuccess = (data) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: data
});

export const sendMessageFailure = (error) => ({
    type: SEND_MESSAGE_FAILURE,
    payload: error
});

export const createUserRequest = (payload) => ({
  type: CREATE_USER_REQUEST,
  payload,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});