import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_MESSAGES_REQUEST,
  SEND_MESSAGE_REQUEST
} from "./appTypes";
import {
  fetchMessagesSuccess,
  fetchMessagesFailure,
  sendMessageSuccess,
  sendMessageFailure
} from "./appActions";
import { getMessages, newMessage } from "../../api/index";

function* fetchMessagesSaga(action) {
  try {
    const response = yield call(getMessages, action.payload);
    yield put(fetchMessagesSuccess(response.data));
  } catch (error) {
    yield put(fetchMessagesFailure(error.message));
  }
}

function* sendMessageSaga(action) {
  try {
    const response = yield call(newMessage, action.payload);
    yield put(sendMessageSuccess(response.data));
  } catch (error) {
    yield put(sendMessageFailure(error.message));
  }
}

export default function* messageSaga() {
  yield takeLatest(FETCH_MESSAGES_REQUEST, fetchMessagesSaga);
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessageSaga);
}
