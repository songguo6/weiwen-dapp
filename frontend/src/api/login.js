import ScatterJS from 'scatterjs-core'
import { network, app_name } from './config'

import * as actionCreator from '../store/actionCreator';

const checkConnected = async () => {
  const connected = await ScatterJS.scatter.connect(
    app_name,
    { initTimeout: 5000 },
  );
  if (!connected) {
    console.log(`You need to have Scatter installed. Visit https://get-scatter.com`);
  }
}

export const login = () => (
  async (dispatch) => {
    try {
      await checkConnected();
      const identity = await ScatterJS.scatter.login({accounts:[network]})
      const account = identity.accounts[0];
      dispatch(actionCreator.changeLoginStatus(account.name));   
    } catch (error) {
      console.error(error);
    }
  }
);

export const logout = () => (
  async (dispatch) => {
    await ScatterJS.scatter.logout();
    dispatch(actionCreator.changeLoginStatus(false));
  }
);

