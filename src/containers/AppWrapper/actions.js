import { request } from 'core/constants';

export const fetchTargets = () => (dispatch) => {
  request.get('targets')
    .then((response) => {
      dispatch({
        type: 'APP_FETCH_TARGETS',
        payload: response.data
      });
    })
    .catch(() => {
      dispatch({
        type: 'APP_FETCH_TARGETS_ERROR',
        payload: []
      });
    });
};



