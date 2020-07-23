/* eslint-disable no-unreachable */
const { addNotification } = require('../actions/notificationsActions');

const initState = {
  token: localStorage.getItem('token'),
  admin: null,
  // users: null,
  isAdminAuthenticated: false,
  isLoading: true
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN': {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // admin: action.payload.admin,
        ...action.payload,
        isAdminAuthenticated: true,
        isLoading: false
      };
    }
    case 'AUTH_FAIL':
    case 'ADMIN_LOGOUT':
      localStorage.removeItem('token');
      return {
        admin: null,
        isAdminAuthenticated: false,
        isLoading: true
      };

    case 'USER_INFO': {
      return {
        ...state,
        isloading: false,
        users: action.payload
      };
    }
    case 'ADMIN_VERIFY': {
      return {
        ...state,
        admin: action.payload.admin,
        isAdminAuthenticated: true,
        isLoading: false
      };
    }


    default: {
      return state;
    }
  }
};
export default adminReducer;
