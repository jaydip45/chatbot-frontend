import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from './adminTypes';

// Action creators
export const adminLoginRequest = (payload) => ({
  type: ADMIN_LOGIN_REQUEST,
  payload, // { email, password }
});

export const adminLoginSuccess = (token) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: token,
});

export const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});
