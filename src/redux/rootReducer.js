import { combineReducers } from "redux";
import appReducer from "./app/appReducer";
import adminReducer from "./admin/adminReducer";

export default combineReducers({
    app:appReducer,
    admin:adminReducer
});
