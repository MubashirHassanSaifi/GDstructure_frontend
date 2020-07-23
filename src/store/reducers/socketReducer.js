const initstate = {
  socket: null
};

const socketReducer = (state = initstate, action) => {
  switch (action.type) {
    case 'CONNECT_SOCKET':
      return {
        ...state,
        socket: action.payload
      };


    default:
      return state;
  }
};

export default socketReducer;
