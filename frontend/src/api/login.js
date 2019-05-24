import ScatterJS from 'scatterjs-core'
import { network } from './config'
import { checkConnected } from './common';
import { fetchByPrimary } from './fetch';

import * as actionCreator from '../store/actionCreator';

export const login = async (dispatch) => {
  try {
    await checkConnected();
    const identity = await ScatterJS.scatter.login({accounts:[network]})
    const account = identity.accounts[0];
    fetchByPrimary('usertable','account',account.name).then(res => {
      dispatch(actionCreator.changeLoginStatus(res));   
    });
  } catch (error) {
    console.error(error);
  }
}

export const logout = async (dispatch) => {
  try {
    await ScatterJS.scatter.logout();
    dispatch(actionCreator.changeLoginStatus({
      account: '',
      balance: '',
      follow_num: '',
      fans_num: '',
      post_num: '',
      like_num: '',
    }));
  } catch (error) {
    console.error(error);
  }
}

export const checkLogin = async (dispatch) => {
  try {
    await checkConnected();
    const res = await ScatterJS.scatter.checkLogin();
    if(res) dispatch(login);
  } catch (error) {
    console.error(error);
  }
};



