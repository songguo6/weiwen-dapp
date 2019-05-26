import { pushAction } from './send';
import { msgTx, notify } from '../util/Utils';
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

export const post = async (content, attachtype, attachment, callback) => {
  const logged = store.getState().logged;
  try{
    const res = await pushAction(logged.name, logged.authority, 'post', {
      author: logged.name,
      content,
      attachtype,
      attachment,
    });
    callback(res);
  }catch(error){
    callback(error);
  }
}