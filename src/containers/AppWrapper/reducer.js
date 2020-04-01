const initialState = {
  isSessionActive: null,
  loggedUser: null
};

export default (state = initialState, action = {}) => {

  switch (action.type) {
  case 'UPDATE_TARGETS_DATA':
    state = Object.assign({}, state, {
      targets: updateTargets(state.targets, action.payload)
    });
    break;
  default:
    break;
  }

  return state;
};
