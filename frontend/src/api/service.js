import { pushAction } from './send';
import { msgTx, notify } from './common';
import store from '../store';
import { getUserInfo } from '../store/actionCreator';

export const reward = async (dispatch) => {
  const logged = store.getState().logged;
  if(logged.name){
    try{
      const res = await pushAction(logged.name, logged.authority, 'reward', {account: logged.name});
      msgTx(res.transaction_id);
      dispatch(getUserInfo(logged.name));
    }catch(error){
      notify(error.type, error.message);
    }
  }
};