import * as actionTypes from './actionTypes';

const defaultState = {
  logged: {},
  user: {},
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case actionTypes.CHANGE_LOGIN_STATUS:  
      newState.logged = action.value;
      break;
    case actionTypes.CHANGE_USER_INFO:
      newState.user = action.value;
      break;
    default:
      break;     
  }
  return newState;
}
