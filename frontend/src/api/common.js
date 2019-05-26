import ScatterJS from 'scatterjs-core'
import { notification, message } from 'antd';
import { app_name } from './config'

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

export const checkConnected = async () => {
  const connected = await ScatterJS.scatter.connect(
    app_name,
    { initTimeout: 5000 },
  );
  if (!connected) notify('没有检测到Scatter', '请安装Scatter或激活');
}