/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
// LOGIN,


} from 'src/store/actions/accountActions';
// import { REGISTER } from 'redux-persist';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  isLoading: true
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADING': {
      return {
        ...state,
        isLoading: true
      };
    }

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,


      };

    case 'USER_LOADED': {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false

      };
    }


    case 'AUTH_FALIURE':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: true
      };

      // case 'SILENT_LOGIN': {
      //   const { user } = action.payload;

      //   return produce(state, (draft) => {
      //     draft.user = user;
      //   });
      // }


    case 'UPDATE_PROFILE': {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
