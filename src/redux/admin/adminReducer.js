import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from './adminTypes';

const initialState = {
  loading: false,
  token: null,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case ADMIN_LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    case ADMIN_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
