import ScatterJS from 'scatterjs-core'
import { network } from './config'
import { checkConnected } from './common';

import { fetchOne } from './fetch'; 
import * as actionCreator from '../store/actionCreator';

export const login = async (dispatch) => {
  try {
    await checkConnected();
    const identity = await ScatterJS.scatter.login({accounts:[network]});
    const account = identity.accounts[0];
    const res = await fetchOne('usertable', account.name);
    if(res){
      dispatch(actionCreator.changeLoginStatus(res));   
    }
  } catch (error) {
    console.error(error);
  }
}

export const logout = async (dispatch) => {
  try {
    await ScatterJS.scatter.logout();
    dispatch(actionCreator.changeLoginStatus({}));
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



