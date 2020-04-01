import { request } from 'core/constants';

import { parseQuery, queryCustomRange } from 'utils/utils';

import { promiseWrapper, buildQuery } from 'utils/utilsFn';

export const isFetchingData = (is, type) => (dispatch) => {
  dispatch({
    type: 'IS_FETCHING',
    payload: is,
    dataType: type
  });
};

let inProgress = false;

export const fetchProduction = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {

    if (!inProgress) inProgress = true;

    let component = path.component;
    if (path.sector === 'shift') component = 'shifts';
    request.get(`production/${component + '/' + path.componentId}${buildQuery(query, queryCustomRange)}`)
      .then((response) => {
        delay(() => {
          if (!inProgress) {
            resolve();
            return;
          }
          inProgress = false;
          dispatch({
            type: 'FETCH_PRODUCTION',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_PRODUCTION_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchOEE = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {
    request.get(`production/${path.component + '/' + path.componentId}/simple_calc_oee${buildQuery(query, queryCustomRange)}`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_OEE',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_OEE_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchEfficiency = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {
    request.get(`efficiency/${path.component + '/' + path.componentId}${buildQuery(query, queryCustomRange)}`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_EFFICIENCY',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_EFFICIENCY_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchEvents = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {
    request.get(`production/${path.component + '/events'}${buildQuery(query, queryCustomRange)}`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_EVENTS',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_EVENTS_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchCurrentProduction = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {
    request.get(`production/${path.component + '/' + path.componentId + '/machines/status'}${
      buildQuery(query, queryCustomRange)
    }`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_CURRENT_PRODUCTION',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_CURRENT_PRODUCTION_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchProductionFlow = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {
    request.get(`production/${path.component + '/' + path.componentId + '/machines/flow'}${
      buildQuery(query, queryCustomRange)
      }`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_PRODUCTION_FLOW',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_PRODUCTION_FLOW_ERROR',
          payload: error
        });
        reject();
      });
  })
);

export const fetchEfficiencyProgress = (path, query) => (dispatch) => (
  promiseWrapper((resolve, reject, delay) => {

    let component = path.component;
    if (path.sector === 'shift') component = 'shifts/lines';

    request.get(`efficiencyprogress/${component + '/' + path.componentId}${buildQuery(query, queryCustomRange)}`)
      .then((response) => {
        delay(() => {
          dispatch({
            type: 'FETCH_EFFICIENCYPROGRESS',
            payload: response.data
          });
          resolve();
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_EFFICIENCYPROGRESS_ERROR',
          payload: error
        });
        reject();
      });
  })
);

// TODO: Try to optimize this strategy created to avoid isFetchingData returning false when
// user do a new request before the current request is done
let countProductionReq = 0;
let countEfficiencyReq = 0;
let countEfficiencyProgressReq = 0;
let countOEEReq = 0;

// Combined actions to fetch all data necessary on Total Production, Single Period and Scrap tab
export const fetchAllProductionData = (path, query) => (dispatch) => {
  countProductionReq++;
  countEfficiencyReq++;
  countOEEReq++;
  dispatch(isFetchingData(true, 'all'));
  dispatch(fetchProduction(path, query)).then(() => {
    if (countProductionReq === 1) {
      dispatch(isFetchingData(false, 'production'));
      countProductionReq = 0;
    } else {
      countProductionReq--;
    }
  }, () => countProductionReq--);
  dispatch(fetchEfficiency(path, query)).then(() => {
    if (countEfficiencyReq === 1) {
      dispatch(isFetchingData(false, 'efficiency'));
      countEfficiencyReq = 0;
    } else {
      countEfficiencyReq--;
    }
  }, () => countEfficiencyReq--);
  dispatch(fetchOEE(path, query)).then(() => {
    if (countOEEReq === 1) {
      dispatch(isFetchingData(false, 'oee'));
      countOEEReq = 0;
    } else {
      countOEEReq--;
    }
  }, () => countOEEReq--);
  dispatch(fetchEfficiencyProgress(path, query)).then(() => {
    if (countEfficiencyProgressReq === 1) {
      dispatch(isFetchingData(false, 'efficiencyProgress'));
      countEfficiencyProgressReq = 0;
    } else {
      countEfficiencyProgressReq--;
    }
  }, () => countEfficiencyProgressReq--);
};

// Combined actions to fetch all data necessary on Flow Section component
export const fetchFlowSection = (path, query) => (dispatch) => {
  // dispatch(isFetchingData(true, 'all'));
  dispatch(fetchEvents(path, query)).then(() => {
    dispatch(isFetchingData(false, 'events'));
  });
  dispatch(fetchCurrentProduction(path, query)).then(() => {
    dispatch(isFetchingData(false, 'currentProduction'));
  });
  dispatch(fetchProductionFlow(path, query)).then(() => {
    dispatch(isFetchingData(false, 'productionFlow'));
  });
};

export const update = () => (dispatch) => {
  dispatch({ type: 'UPDATE' });
};
