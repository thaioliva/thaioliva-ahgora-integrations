import { uuid } from 'utils/utils';

const initialState = {
  eventKey: uuid(),

  production: [],
  efficiency: [],
  efficiencyProgress: [],
  oee: [],
  events: [],
  currentProduction: [],
  productionFlow: [],

  isFetching: {
    production: false,
    efficiency: false,
    events: false,
    currentProduction: false,
    productionFlow: false,
    oee: false,
    efficiencyProgress: false
  },

  products: null,
  machines: null,
  downtime: null,
  downtimeReasons: null,
  orders: null,
  scrapDetails: null,
  targets: null,
  isUpdating: uuid(),
  errorRequest: []
};

export default (state = initialState, action = {}) => {

  switch (action.type) {

  case 'IS_FETCHING':
    let isFetching = { ...state.isFetching };
    if (action.dataType === 'all') {
      Object.keys(isFetching).forEach((item) => isFetching[item] = action.payload);
    } else {
      isFetching = { ...isFetching, ...{ [action.dataType]: action.payload } };
    }
    state = { ...state, ...{ isFetching: isFetching } };
    break;

  case 'FETCH_PRODUCTION':
    state = { ...state, ...{ production: action.payload.lineChartData } };
    break;

  case 'FETCH_EFFICIENCY':
    state = { ...state, ...{ efficiency: action.payload.lineStatus } };
    break;

  case 'FETCH_EVENTS':
    state = { ...state, ...{ events: action.payload } };
    break;

  case 'FETCH_CURRENT_PRODUCTION':
    state = { ...state, ...{ currentProduction: action.payload } };
    break;

  case 'FETCH_PRODUCTION_FLOW':
    state = { ...state, ...{ productionFlow: action.payload } };
    break;
  
  case 'FETCH_EFFICIENCYPROGRESS':
    state = { ...state, ...{ efficiencyProgress: action.payload.efficiency_progress } };
    break;
  case 'FETCH_OEE':
    state = { ...state, ...{ oee: action.payload.oee } };
    break;
  default:
    break;
  }
  return state;
};