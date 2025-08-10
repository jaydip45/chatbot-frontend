import { takeLatest, call, put } from 'redux-saga/effects';
import {
    CREATE_CONVERSATION_REQUEST,
    SEND_MESSAGE_REQUEST,
    CREATE_USER_REQUEST
} from './appTypes';
import {
    createConversationSuccess,
    createConversationFailure,
    sendMessageSuccess,
    sendMessageFailure,
    createUserSuccess,
    createUserFailure
} from './appActions';
import { createConversation, sendMessage, addUser } from './../../api/index';

function fetchIpAddress() {
    return fetch('https://api.ipify.org?format=json').then((res) => res.json());
}

function getDeviceInfo() {
    return `${navigator.userAgent}`;
}

function* createUserSaga() {
    try {
        const ipData = yield call(fetchIpAddress);
        const ipAddress = ipData.ip;

        let sessionId = localStorage.getItem('chat_sessionId');
        if (!sessionId) {
            sessionId = `session_${Date.now()}`;
            localStorage.setItem('chat_sessionId', sessionId);
        }

        const deviceInfo = getDeviceInfo();

        const payload = { sessionId, ipAddress, deviceInfo };
        const response = yield call(addUser, payload);
        const user = response.data;

        localStorage.setItem('chat_userId', user._id);
        console.log('user : ',user)
        yield put(createUserSuccess(response.data));

    } catch (error) {
        yield put(createUserFailure(error.message));
    }
}

function* handleCreateConversation(action) {
    try {
        const { senderId, firstMessage } = action.payload;
        const { data } = yield call(createConversation, { senderId });
        yield put(createConversationSuccess(data));

        if (firstMessage) {
            yield put({
                type: SEND_MESSAGE_REQUEST,
                payload: {
                    conversationId: data._id,
                    senderId,
                    text: firstMessage
                }
            });
        }
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
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}
