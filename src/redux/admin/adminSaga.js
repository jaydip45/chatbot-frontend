import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADMIN_LOGIN_REQUEST,
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_MESSAGES_REQUEST,
    FETCH_USERINFO_REQUEST,
    SEND_MESSAGE_REQUEST,
} from './adminTypes';
import {
    adminLoginSuccess, adminLoginFailure, fetchConversationsSuccess,
    fetchConversationsFailure,
    fetchMessagesSuccess,
    fetchMessagesFailure,
    fetchUserInfoSuccess,
    fetchUserInfoFailure,
    sendMessageSuccess,
    sendMessageFailure,
} from './adminActions';
import { adminLogin, fetchAdminConversations,
  fetchAdminMessages,
  fetchAdminUserInfo,
  sendAdminMessage, } from './../../api/index';

function* loginSaga(action) {
    try {
        const response = yield call(adminLogin, action.payload);
        const token = response.data.token;
        localStorage.setItem('adminToken', token);

        yield put(adminLoginSuccess(token));
    } catch (error) {
        yield put(adminLoginFailure(error.response?.data?.message || error.message));
    }
}

function* fetchConversationsSaga() {
  try {
    const token = localStorage.getItem('adminToken');
    const response = yield call(fetchAdminConversations, token);
    yield put(fetchConversationsSuccess(response.data));
  } catch (error) {
    yield put(fetchConversationsFailure(error.response?.data?.message || error.message));
  }
}

function* fetchMessagesSaga(action) {
  try {
    const token = localStorage.getItem('adminToken');
    const response = yield call(fetchAdminMessages, action.payload, token);
    yield put(fetchMessagesSuccess(response.data));
  } catch (error) {
    yield put(fetchMessagesFailure(error.response?.data?.message || error.message));
  }
}

function* fetchUserInfoSaga(action) {
  try {
    const token = localStorage.getItem('adminToken');
    const response = yield call(fetchAdminUserInfo, action.payload, token);
    yield put(fetchUserInfoSuccess(response.data));
  } catch (error) {
    yield put(fetchUserInfoFailure(error.response?.data?.message || error.message));
  }
}

function* sendMessageSaga(action) {
  try {
    const token = localStorage.getItem('adminToken');
    const response = yield call(sendAdminMessage, action.payload, token);
    yield put(sendMessageSuccess(response.data.data));
  } catch (error) {
    yield put(sendMessageFailure(error.response?.data?.message || error.message));
  }
}

export default function* watchAdminSaga() {
    yield takeLatest(ADMIN_LOGIN_REQUEST, loginSaga);
    yield takeLatest(FETCH_CONVERSATIONS_REQUEST, fetchConversationsSaga);
    yield takeLatest(FETCH_MESSAGES_REQUEST, fetchMessagesSaga);
    yield takeLatest(FETCH_USERINFO_REQUEST, fetchUserInfoSaga);
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessageSaga);
}
