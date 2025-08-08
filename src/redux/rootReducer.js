import { combineReducers } from "redux";
import chatReducer from "./chat/chatSlice";

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
