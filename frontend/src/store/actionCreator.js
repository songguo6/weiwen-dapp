import * as actionTypes from './actionTypes';
import { fetchOne } from '../api/fetch'; 

export const changeLoginStatus = (value) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  value,
})

export const changeUserInfo = (value) => ({
  type: actionTypes.CHANGE_USER_INFO,
  value,
})

export const getUserInfo = (value) => (
  async (dispatch) => {
    const res = await fetchOne('usertable', value);
    if(res){
      dispatch(changeUserInfo(res));   
    }
  }
)