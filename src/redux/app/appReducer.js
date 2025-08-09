import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE
} from './appTypes';

const initialState = {
    conversation: null,
    messages: [],
    loading: false,
    error: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONVERSATION_REQUEST:
        case SEND_MESSAGE_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_CONVERSATION_SUCCESS:
            return { ...state, loading: false, conversation: action.payload };

        case SEND_MESSAGE_SUCCESS:
            return { ...state, loading: false, messages: [...state.messages, action.payload] };

        case CREATE_CONVERSATION_FAILURE:
        case SEND_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default appReducer;
