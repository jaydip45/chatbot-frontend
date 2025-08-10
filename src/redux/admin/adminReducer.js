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

const initialState = {
    token: null,
    loadingConversations: false,
    conversations: [],
    loadingMessages: false,
    messages: [],
    loadingUserInfo: false,
    userInfo: null,
    sendingMessage: false,
    sendMessageError: null,
    error: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case ADMIN_LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload, error: null };
        case ADMIN_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_CONVERSATIONS_REQUEST:
            return { ...state, loadingConversations: true, error: null };
        case FETCH_CONVERSATIONS_SUCCESS:
            return { ...state, loadingConversations: false, conversations: action.payload };
        case FETCH_CONVERSATIONS_FAILURE:
            return { ...state, loadingConversations: false, error: action.payload };

        // Messages
        case FETCH_MESSAGES_REQUEST:
            return { ...state, loadingMessages: true, error: null };
        case FETCH_MESSAGES_SUCCESS:
            return { ...state, loadingMessages: false, messages: action.payload };
        case FETCH_MESSAGES_FAILURE:
            return { ...state, loadingMessages: false, error: action.payload };

        // User Info
        case FETCH_USERINFO_REQUEST:
            return { ...state, loadingUserInfo: true, error: null };
        case FETCH_USERINFO_SUCCESS:
            return { ...state, loadingUserInfo: false, userInfo: action.payload };
        case FETCH_USERINFO_FAILURE:
            return { ...state, loadingUserInfo: false, error: action.payload };

        // Send Message
        case SEND_MESSAGE_REQUEST:
            return { ...state, sendingMessage: true, sendMessageError: null };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sendingMessage: false,
                messages: [...state.messages, action.payload]
            };
        case SEND_MESSAGE_FAILURE:
            return { ...state, sendingMessage: false, sendMessageError: action.payload };

        default:
            return state;
    }
};

export default adminReducer;
