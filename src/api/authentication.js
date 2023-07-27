import Api from '.';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN,
  FORGOT_PASS,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER,
} from '../redux/actions/rootAction';

export const login = (data, dispatch) => {
  dispatch({ type: LOGIN });
  Api.post('/user/login', data)
    .then(res => {
      // console.log('LOGIN RESPONSE====>', res);
      if (res.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: res });
      } else {
        dispatch({ type: LOGIN_FAILED, payload: res.message });
      }
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED, payload: err });
    });
};

export const register = (data, dispatch) => {
  dispatch({ type: REGISTER });
  Api.post('/user/signup', data)
    .then(res => {
      // console.log('Register RESPONSE====>', res);
      if (res.success) {
        dispatch({ type: REGISTER_SUCCESS, payload: res });
      } else {
        dispatch({ type: REGISTER_FAILED, payload: res.message });
      }
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILED, payload: err });
    });
};

export const forgotPass = (data, dispatch) => {
  dispatch({ type: FORGOT_PASS });
  Api.post('/user/forgot', data)
    .then(res => {
      // console.log('FORGOT PASS RESPONSE====>', res);
      if (res.success) {
        dispatch({ type: FORGOT_PASS_SUCCESS, payload: res });
      } else {
        dispatch({ type: FORGOT_PASS_FAILED, payload: res.message });
      }
    })
    .catch(err => {
      dispatch({ type: FORGOT_PASS_FAILED, payload: err });
    });
};