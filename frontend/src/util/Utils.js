import { notification, message } from 'antd';

export const msgSuccess = (msg) => {
  message.success(msg);
}

export const msgError = (msg) => {
  message.error(msg);
}

export const msgTx = (txid) => {
  msgSuccess('excute success, tx_id:' + txid);
}

export const notify = (message, description) => {
  notification.error({
    message,
    description,
  });
};

export const isToday = (time) => {
  return new Date(time).toDateString() === new Date(new Date().valueOf()-8*3600000).toDateString();
}
