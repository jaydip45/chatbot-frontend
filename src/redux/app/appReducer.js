import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
} from './appTypes';

const initialState = {
    conversation: null,
    messages: [],
    user: null,
    loading: false,
    error: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONVERSATION_REQUEST:
        case SEND_MESSAGE_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_CONVERSATION_SUCCESS:
            return {
                ...state,
                loading: false,
                conversation: {
                    ...action.payload,
                    messages: action.payload.messages || [],
                },
            };

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                conversation: state.conversation
                    ? {
                        ...state.conversation,
                        messages: [...state.conversation.messages, action.payload],
                    }
                    : state.conversation,
            };

        case CREATE_CONVERSATION_FAILURE:
        case SEND_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case CREATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default appReducer;
