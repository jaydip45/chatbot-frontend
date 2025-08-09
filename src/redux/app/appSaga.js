import { takeLatest, call, put } from 'redux-saga/effects';
import {
    CREATE_CONVERSATION_REQUEST,
    SEND_MESSAGE_REQUEST
} from './appTypes';
import {
    createConversationSuccess,
    createConversationFailure,
    sendMessageSuccess,
    sendMessageFailure
} from './appActions';
import { createConversation, sendMessage } from './../../api/index';

function* handleCreateConversation(action) {
    try {
        const { data } = yield call(createConversation, action.payload);
        yield put(createConversationSuccess(data));
    } catch (error) {
        yield put(createConversationFailure(error.message));
    }
}

function* handleSendMessage(action) {
    try {
        const { data } = yield call(sendMessage, action.payload);
        yield put(sendMessageSuccess(data));
    } catch (error) {
        yield put(sendMessageFailure(error.message));
    }
}

export default function* appSaga() {
    yield takeLatest(CREATE_CONVERSATION_REQUEST, handleCreateConversation);
    yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessage);
}
