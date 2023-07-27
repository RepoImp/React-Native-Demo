import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN,
  LOGIN_RESET,
} from '../actions/rootAction';

const initialState = {
  login_data: null,
  login_error: '',
  loading: false,
};

export default function loginReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case LOGIN: {
      return {...state, loading: true};
    }
    case LOGIN_SUCCESS: {
      return {...state, loading: false, login_data: payload};
    }
    case LOGIN_FAILED: {
      return {...state, loading: false, login_error: payload};
    }
    case LOGIN_RESET: {
      return {
        login_data: null,
        login_error: '',
        loading: false,
      };
    }
    default:
      return state;
  }
}
