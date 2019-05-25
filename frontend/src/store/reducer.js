import * as actionTypes from './actionTypes';

const defaultState = {
  user: {}
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case actionTypes.CHANGE_LOGIN_STATUS:  
      newState.user = action.value;
      break;
    default:
      break;     
  }
  return newState;
}
