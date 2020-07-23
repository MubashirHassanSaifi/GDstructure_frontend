/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
// import produce from 'immer';
// import { GET_NOTIFICATIONS } from 'src/store/actions/notificationsActions';

const initialState = {
  notifications: [],
  count: 0
};

const notificationsReducer = (state = initialState, action) => {
  let i = 0;
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      state.notifications.forEach((notify) => {
        if (notify.title === action.payload.title) {
          i = 1;
        }
      });
      if (i === 0) {
        return {
          ...state,
          notifications: [action.payload, ...state.notifications],
          count: state.count + 1
        };
      }
      return {
        ...state
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: [],
        count: 0
      };


    default:
      return state;
  }
};


export default notificationsReducer;
