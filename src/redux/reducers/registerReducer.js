import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER,
  REGISTER_RESET,
} from '../actions/rootAction';

const initialState = {
  register_data: null,
  register_error: '',
  loading: false,
};

export default function registerReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case REGISTER: {
      return {...state, loading: true};
    }
    case REGISTER_SUCCESS: {
      return {...state, loading: false, register_data: payload};
    }
    case REGISTER_FAILED: {
      return {...state, loading: false, register_error: payload};
    }
    case REGISTER_RESET: {
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
