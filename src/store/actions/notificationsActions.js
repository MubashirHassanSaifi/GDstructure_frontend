/* eslint-disable import/prefer-default-export */
// import axios from 'src/utils/axios';

// export const GET_NOTIFICATIONS = '@notifications/get-notifications';

// export function getNotifications() {
//   const request = axios.get('/api/notifications');

export const addNotification = (data) => (dispatch) => {
  dispatch({
    type: 'ADD_NOTIFICATION',
    payload: data
  });
};

export const clearNotification = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION',

  });
};
