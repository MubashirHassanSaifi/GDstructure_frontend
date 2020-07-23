/* eslint-disable no-underscore-dangle */

const initState = {
  isloading: true,
  energy: [],
  logs: [],
  alertloading: true,
  chartloading: true,
  alertColumn: [],
  alertData: [],
  chartData_Va: [],
  chartData_Vb: [],
  chartData_Vc: [],
  chartData_Ia: [],
  chartData_Ib: [],
  chartData_Ic: [],
  chartLabels: []

};

const energyReducer = (_state = initState, action) => {
  let index = null;
  switch (action.type) {
    case 'GET_ENERGY':

      return {
        ..._state,
        energy: action.payload,
        isloading: false

      };
    case 'SET_UNIT_THRESHOLE':

      // eslint-disable-next-line no-underscore-dangle
      index = _state.energy.findIndex((f) => f._id === action.id);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            U_upperLmt: action.payload
          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'SET_CURRENT_THRESHOLE':

      // eslint-disable-next-line no-underscore-dangle
      index = _state.energy.findIndex((f) => f._id === action.id);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            I_upperLmt: action.payload
          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'SET_POWER_THRESHOLE':

      // eslint-disable-next-line no-underscore-dangle
      index = _state.energy.findIndex((f) => f._id === action.id);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Pf_lowerLmt: action.payload
          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'SET_VOLTAGE_THRESHOLE':

      // eslint-disable-next-line no-underscore-dangle
      index = _state.energy.findIndex((f) => f._id === action.id);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            V_lowerLmt: action.payload.lowerlmt,
            V_upperLmt: action.payload.upperlmt
          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'GET_ALERTS':
      return {
        ..._state,
        alertloading: false,
        alertData: action.payload.data,
        alertColumn: action.payload.columns
      };
    case 'CHART_DATA_Va':
      return {
        ..._state,
        chartData_Va: action.payload.data,
        chartLabels: action.payload.labels,
        chartloading: true

      };
    case 'CHART_DATA_Vb':
      return {
        ..._state,
        chartData_Vb: action.payload.data,
        chartloading: true

      };
    case 'CHART_DATA_Vc':
      return {
        ..._state,
        chartData_Vc: action.payload.data,
        chartloading: true

      };
    case 'CHART_DATA_Ia':
      return {
        ..._state,
        chartData_Ia: action.payload.data,
        chartloading: true

      };
    case 'CHART_DATA_Ib':
      return {
        ..._state,
        chartData_Ib: action.payload.data,
        chartloading: true

      };
    case 'CHART_DATA_Ic':
      return {
        ..._state,
        chartData_Ic: action.payload.data,
        chartloading: false

      };
    case 'UPDATE_Va':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      console.log(action.payload);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Va: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Vb':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Vb: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Vc':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Vc: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Ia':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Ia: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Ib':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Ib: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Ic':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Ic: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_Pf':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            Pf: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_PR':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            PR: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_PA':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            PA: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };
    case 'UPDATE_U':
      index = _state.energy.findIndex((f) => f._id === action.payload.sensorId);
      return {
        ..._state,
        energy: [
          ..._state.energy.slice(0, index),
          {
            ..._state.energy[index],
            U: action.payload.value,

          },
          ..._state.energy.slice(index + 1)
        ]
      };

      // case 'CHART_LOADING': {
      //   return {
      //     chartloading: false
      //   };
      // }


    default:
      return _state;
  }
};
export default energyReducer;
