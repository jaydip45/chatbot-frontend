import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from './adminTypes';
import { adminLoginSuccess, adminLoginFailure } from './adminActions';
import { adminLogin } from './../../api/index';

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

export default function* watchAdminSaga() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, loginSaga);
}
