import * as actionTypes from './actionTypes';

const defaultState = {
  user: {
    account: '',
    balance: '',
    follow_num: '',
    fans_num: '',
    post_num: '',
    like_num: '',
  }
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
