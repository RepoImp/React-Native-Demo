import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import forgotPassReducer from './forgotPassReducer';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  forgotPassReducer
});

export default rootReducer;
