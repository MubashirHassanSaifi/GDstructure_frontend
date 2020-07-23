import axios from 'axios';
/* eslint-disable import/prefer-default-export */
const config = {
  headers: {
    'Content-type': 'Application/json'
  }
};

export const getEnergyData = (userid) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/energysensor/get/${userid}`, config);
    console.log(res);
    if (res) {
      dispatch({
        type: 'GET_ENERGY',
        payload: res.data
      });
    }
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: 'GET_ERROR',
    //   message: err.response.data,
    //   status: err.response.status,
    //   id: 'LOGIN_FAIL'
    // });
  }
};

export const setUnitThreshole = (threshole, id) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // };

  const body = {
    U_upperLmt: threshole
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/threshole/add_upper_U/${id}`,
      body,
      config);
    if (res) {
      dispatch({
        type: 'SET_UNIT_THRESHOLE',
        payload: threshole,
        id
      });
    }
  } catch (err) {
    dispatch({
      Type: 'GET_ERROR',
      message: err.response.data,
      status: err.response.status,
      id: 'UNIT_THRESHOLE_FAIL'
    });
  }
};

export const setCurrentThreshle = (_thresole, id) => async (dispatch) => {
  const body = {
    I_upperLmt: _thresole
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/threshole/add_upper_I/${id}`, body, config);
    if (res) {
      dispatch({
        type: 'SET_CURRENT_THRESHOLE',
        payload: _thresole,
        id

      });
    }
  } catch (err) {
    dispatch({
      type: 'GET_ERROR',
      messgae: err.response.data,
      status: err.response.status,
      id: 'CURRENT_THRESHOLE_FAIL'
    });
  }
};

export const setPowerThreshle = (value, id) => async (dispatch) => {
  console.log(value, id);
  const body = {
    Pf_lowerLmt: value
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/threshole/add_lower_Pf/${id}`, body, config);
    if (res) {
      dispatch({
        type: 'SET_POWER_THRESHOLE',
        payload: value,
        id

      });
    }
  } catch (err) {
    dispatch({
      type: 'GET_ERROR',
      messgae: err.response.data,
      status: err.response.status,
      id: 'CURRENT_THRESHOLE_FAIL'
    });
  }
};

export const setVoltageThreshle = (lowerValue, upperValue, id) => async (dispatch) => {
  const body1 = {
    V_lowerLmt: lowerValue
  };
  const body2 = {
    V_upperLmt: upperValue
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/threshole/add_lower_V/${id}`, body1, config);
    if (res) {
      await axios.post(`${process.env.REACT_APP_URL}/threshole/add_upper_V/${id}`, body2, config);
    }

    dispatch({
      type: 'SET_VOLTAGE_THRESHOLE',
      payload: {
        lowerlmt: lowerValue,
        upperlmt: upperValue
      },
      id

    });
  } catch (err) {
    dispatch({
      type: 'GET_ERROR',
      messgae: err.response.data,
      status: err.response.status,
      id: 'VOLTAGE_THRESHOLE_FAIL'
    });
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
    console.log(err);
  }
};

export const getEnergyAlerts = (userid) => async (dispatch) => {
  dispatch({
    type: 'ALERTS_LOADING'
  });

  const body = {
    userid
  };
  const res = await axios.post(`${process.env.REACT_APP_URL}/energysensor/alerts`, body, config);

  dispatch({
    type: 'GET_ALERTS',
    payload: res.data
  });
};

export const getChartData = (range, userid) => async (dispatch) => {
  console.log(range, userid);

  // dispatch({
  //   type: 'CHARTS_LOADING'
  // });

  const Va = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Va/${range}/${userid}`, config);
  console.log('here', Va.data);
  if (Va) {
    dispatch({
      type: 'CHART_DATA_Va',
      payload: Va.data
    });
  }
  const Vb = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Vb/${range}/${userid}`, config);
  if (Vb) {
    dispatch({
      type: 'CHART_DATA_Vb',
      payload: Vb.data
    });
  }
  const Vc = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Vc/${range}/${userid}`, config);
  if (Vc) {
    dispatch({
      type: 'CHART_DATA_Vc',
      payload: Vc.data
    });
  }
  const Ia = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Ia/${range}/${userid}`, config);
  if (Ia) {
    dispatch({
      type: 'CHART_DATA_Ia',
      payload: Ia.data
    });
  }
  const Ib = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Ib/${range}/${userid}`, config);
  if (Ib) {
    dispatch({
      type: 'CHART_DATA_Ib',
      payload: Ib.data
    });
  }
  const Ic = await axios.get(`${process.env.REACT_APP_URL}/energysensor/chart/Ic/${range}/${userid}`, config);
  if (Ic) {
    dispatch({
      type: 'CHART_DATA_Ic',
      payload: Ic.data
    });
  }
};
export const updateEnergy = (data) => async (dispatch) => {
  if (data.type === 'Va') {
    dispatch({
      type: 'UPDATE_Va',
      payload: data
    });
  } else if (data.type === 'Vb') {
    dispatch({
      type: 'UPDATE_Vb',
      payload: data
    });
  } else if (data.type === 'Vc') {
    dispatch({
      type: 'UPDATE_Vc',
      payload: data
    });
  } else if (data.type === 'Ia') {
    dispatch({
      type: 'UPDATE_Ia',
      payload: data
    });
  } else if (data.type === 'Ib') {
    dispatch({
      type: 'UPDATE_Ib',
      payload: data
    });
  } else if (data.type === 'Ic') {
    dispatch({
      type: 'UPDATE_Ic',
      payload: data
    });
  } else if (data.type === 'PA') {
    dispatch({
      type: 'UPDATE_PA',
      payload: data
    });
  } else if (data.type === 'PR') {
    dispatch({
      type: 'UPDATE_PR',
      payload: data
    });
  } else if (data.type === 'Pf') {
    dispatch({
      type: 'UPDATE_Pf',
      payload: data
    });
  } else if (data.type === 'U') {
    dispatch({
      type: 'UPDATE_U',
      payload: data
    });
  }
};
