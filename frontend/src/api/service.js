import { fetchAll } from './fetch';
import { pushAction } from './send';
import { msgTx, msgError } from '../util/Utils';
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
      msgError(error.message);
    }
  }
}

export const withdraw = async (quantity) => {
  const logged = store.getState().logged;
  try {
    const res = await pushAction(logged.name, logged.authority, 'withdraw', {
      account: logged.name,
      quantity,
    });
    msgTx(res.transaction_id);
    store.dispatch(getUserInfo(logged.name));
  } catch (error) {
    msgError(error.message);
  }
} 

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

export const like = async (type, typeId, callback) => {
  const logged = store.getState().logged;
  try{
    const res = await pushAction(logged.name, logged.authority, 'like', {
      author: logged.name,
      type,
      type_id: typeId,      
    });
    callback(res);
  }catch(error){
    callback(error);
  }
}

export const isLiked = async (type, typeId) => {
  let isLiked = false;
  const logged = store.getState().logged;
  const res = await fetchAll('liketable', {
    index_position: 3,
    lower_bound: logged.name,
    upper_bound: logged.name,
  })
  for(const k in res){
    const item = res[k];
    if(item.type === type && item.type_id === typeId){
      isLiked = true;
      break;
    }
  }
  return isLiked;
}

export const comment = async (content, postId, callback, hasParent = false, pid = 0, replyTo = '') => {
  const logged = store.getState().logged;
  try {
    const res = await pushAction(logged.name, logged.authority, 'comment', {
      author: logged.name,
      content,
      post_id: postId,
      has_parent: hasParent,
      pid,
      reply_to: replyTo,
    });
    callback(res);
  } catch (error) {
    callback(error);
  }
}
