import { uuid } from 'utils/utils';

const initialState = {
  saveIsSuccess: uuid(),
  message: ''
};

export default (state = initialState, action = {}) => {

  switch (action.type) {
    case 'SAVE_TARGETS_DATA':
      state = Object.assign({}, state, {
        saveIsSuccess: uuid()
      });
      break;
    default:
      break;
  }

  return state;
};
