import { request } from 'core/constants';

export const fetchTargets = (path, query) => (dispatch) => (
  request.get('targets')
    .then((response) => {
      dispatch({
        type: 'FETCH_TARGETS',
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_TARGETS_ERROR',
        payload: error
      });
    })
);

export const saveTarget = (body) => (dispatch) => {
  request.post('targets', body)
    .then((response) => {
      dispatch({
        type: 'SAVE_TARGETS_DATA',
        payload: response.data
      });
      dispatch({
        type: 'UPDATE_TARGETS_DATA',
        payload: body
      });
    })
    .catch((error) => {
      dispatch({
        type: 'SAVE_TARGETS_DATA_ERROR',
        payload: error
      });
    });
};
