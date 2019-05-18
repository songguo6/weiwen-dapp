import * as actionTypes from './actionTypes';

const defaultState = {
  account: ''
}

// reducer 可以接收state，但不能修改state
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case actionTypes.CHANGE_LOGIN_STATUS:  
      newState.account = action.value;
      break;
    default:
      break;     
  }
  return newState;
}
