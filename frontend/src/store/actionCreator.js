import * as actionTypes from './actionTypes';

export const changeLoginStatus = (user) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  value: user,
});