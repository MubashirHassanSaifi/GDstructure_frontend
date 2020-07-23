/* eslint-disable import/prefer-default-export */
export const connectSocket = (socket) => (dispatch) => {
  dispatch({
    type: 'CONNECT_SOCKET',
    payload: socket
  });
};
