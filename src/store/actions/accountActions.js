import axios from 'axios';
// import authService from 'src/services/authService';

// export const LOGIN_REQUEST = '@account/login-request';
// // export const LOGIN_SUCCESS = '@account/login-success';
// // export const REGISTER_SUCCESS = '@account/register-success';
// export const LOGIN_FAILURE = '@account/login-failure';
// // export const REGISTER_FAILURE = '@account/register-failure';
// // export const SILENT_LOGIN = '@account/silent-login';
// export const LOGOUT = '@account/logout';
// export const REGISTER = '@account/register';
// export const LOGIN = '@account/login';
// export const USER_LOADED = '@account/user-loaded';
// export const AUTH_FALIURE = '@account/auth-faliure';
// export const UPDATE_PROFILE = '@account/update-profile';


export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: 'USER_LOADING'
  });


  const config = {
    headers: {
      'Content-type': 'Application/json'
    }
  };
  const body = JSON.stringify({
    email,
    password
  });
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, body, config);
    console.log(res);
    if (res) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAILURE'
    });
    dispatch({
      type: 'GET_ERROR',
      message: err.response.data,
      status: err.response.status,
      id: 'LOGIN_FAIL'
    });
    throw (err);
  }
};




// export function login(email, password) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: LOGIN_REQUEST });

//       const user = await authService.loginWithEmailAndPassword(email, password);

//       dispatch({
//         type: LOGIN,
//         payload: {
//           user
//         }
//       });
//     } catch (error) {
//       dispatch({ type: LOGIN_FAILURE });
//       throw error;
//     }
//   };
// }

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: 'SILENT_LOGIN',
    payload: {
      user
    }
  });
}

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT_SUCCESS'
  });
};


export const register = (values) => async (dispatch) => {
  dispatch({
    type: 'USER_LOADING'

  });
  const config = {
    headers: {
      'Content-type': 'Application/json'
    }
  };
  const body = {
    username: values.username,
    userid: values.userid,
    email: values.email,
    password: values.password
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/register`, body, config);
    if (res) {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: 'REGISTER_FAILURE'
    });
    dispatch({
      type: 'GET_ERR0R',
      message: err.data,
      status: err.status,
      id: 'REGISTRATION_FAIL'


    });
  }
};

export const auth = () => async (dispatch) => {
  const token = await localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      auth: token
    }
  };
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/user/auth`, config);
    console.log('auth', res);
    if (res) {
      dispatch({
        type: 'USER_LOADED',
        payload: res.data

      });
    }
  } catch (err) {
    dispatch({
      type: 'AUTH_FALIURE'

    });
  }
};


export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: 'UPDATE_PROFILE',
      payload: response.data
    }));
  };
}
