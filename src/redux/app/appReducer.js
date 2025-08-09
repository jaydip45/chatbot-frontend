import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from "./appTypes";

const initialState = {
  loading: false,
  messages: [],
  error: null
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
    case SEND_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, loading: false, messages: [...state.messages, action.payload] };
    case FETCH_MESSAGES_FAILURE:
    case SEND_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
