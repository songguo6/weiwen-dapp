import * as actionTypes from './actionTypes';

export const changeLoginStatus = (account) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  value: account
});