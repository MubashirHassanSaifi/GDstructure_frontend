const initState = {
  message: {},
  status: null,
  id: null
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ERROR':
      return {
        ...state,
        message: action.message,
        status: action.status,
        id: action.id
      };


    default:
      return state;
  }
};
export default errorReducer;
