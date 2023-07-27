import {
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILED,
  FORGOT_PASS,
  FORGOT_PASS_RESET,
} from '../actions/rootAction';

const initialState = {
  register_data: null,
  register_error: '',
  loading: false,
};

export default function forgotPassReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case FORGOT_PASS: {
      return {...state, loading: true};
    }
    case FORGOT_PASS_SUCCESS: {
      return {...state, loading: false, forgot_pass_data: payload};
    }
    case FORGOT_PASS_FAILED: {
      return {...state, loading: false, forgot_pass_error: payload};
    }
    case FORGOT_PASS_RESET: {
      return {
        register_data: null,
        register_error: '',
        loading: false,
      };
    }
    default:
      return state;
  }
}
