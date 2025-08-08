import { eventChannel } from "redux-saga";
import { call, put, takeEvery, take } from "redux-saga/effects";
import socket from "../../socket/socket";
import { addMessage } from "./chatSlice";

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("getMessage", (message) => {
      emit(message);
    });
    return () => {};
  });
}

function* watchIncomingMessages() {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const message = yield take(channel);
    yield put(addMessage(message));
  }
}

export default function* chatSaga() {
  yield takeEvery("chat/connectSocket", watchIncomingMessages);
}
