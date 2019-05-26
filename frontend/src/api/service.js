import { pushAction } from './send';
import { notify, notify_err } from './common';
import store from '../store';
import { getUserInfo } from '../store/actionCreator';

export const reward = async (dispatch) => {
  const logged = store.getState().logged;
  if(logged.name){
    try{
      const res = await pushAction(logged.name, logged.authority, 'reward', {account: logged.name});
      notify('excute success', 'tx_id:' + res.transaction_id);
      dispatch(getUserInfo(logged.name));
    }catch(error){
      notify_err(error.type, error.message);
    }
  }
};