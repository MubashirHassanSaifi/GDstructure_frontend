/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const config = {
  headers: {
    'Content-type': 'Application/json'
  }
};


// _____________admin Login_________
export const adminLogin = (username, password) => async (dispatch) => {
  dispatch({
    type: 'ADMIN_LOADING'
  });

  const body = {
    username,
    password
  };
  try {
    const res = await axios.post('http://localhost:5000/admin/login', body, config);
    console.log(res);
    if (res) {
      dispatch({
        type: 'ADMIN_LOGIN',
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: 'ADMIN_FAIL'
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

// _______________admin Logout_____________
export const adminLogOut = () => (dispatch) => {
  dispatch({
    type: 'ADMIN_LOGOUT'
  });
};

// _______________Get All Users________________
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/admin/userinfo', config);
    dispatch({
      type: 'USER_INFO',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERROR',
      message: err.response.data,
      status: err.response.status,
      id: 'USER_FAIL'
    });
  }
};

// ____________________Admin auth_________________
export const adminAuth = () => async (dispatch) => {
  const token = await localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      auth: token
    }
  };
  try {
    const res = await axios.get('http://localhost:5000/admin/auth', config);
    console.log(res.data);
    dispatch({
      type: 'ADMIN_VERIFY',
      payload: res.data

    });
  } catch (err) {
    dispatch({
      type: 'AUTH_FAIL'
    });
  }
};
