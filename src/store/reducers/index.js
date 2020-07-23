import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import errorReducer from './errorReducer';
import energyReducer from './EnergyReducer';
import logReducer from './logsReducer';
import socketReducer from './socketReducer';
import adminReducer from './adminReducer';


const rootReducer = combineReducers({
  account: accountReducer,
  admin: adminReducer,
  notifications: notificationsReducer,
  socket: socketReducer,
  energy: energyReducer,
  logs: logReducer,
  error: errorReducer,
  form: formReducer
});

export default rootReducer;
