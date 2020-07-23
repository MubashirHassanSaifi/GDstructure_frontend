/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const config = {
  headers: {
    'content-type': 'application/json'
  }
};


export const getLogData = (tableType, userid, startDate, endDate) => async (dispatch) => {
  const body = {
    sensor: tableType,
    userid,
    startDate,
    endDate
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/logs/`, body, config);
    console.log(res.data);
    dispatch({
      type: 'GET_LOG_DATA',
      payload: res.data

    });
  } catch (err) {
    dispatch({
      type: 'GET_ERROR',
      message: err.res.data,
      status: err.res.status,
      id: 'LOGS_FAIL'
    });
  }
};
