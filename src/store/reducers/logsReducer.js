const initState = {
  logs: [],
  isloading: true,
  columns: []

};

const LogReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_LOG_DATA':
      return {
        ...state,
        logs: action.payload.data,
        columns: action.payload.columns,
        isloading: false
      };

    default:
      return state;
  }
};
export default LogReducer;
