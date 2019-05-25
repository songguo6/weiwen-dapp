import ScatterJS from 'scatterjs-core'
import { notification } from 'antd';
import { app_name } from './config'

export const notify = (message, description) => {
  notification.success({
    message,
    description,
  });
}

export const notify_err = (message, description) => {
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
  if (!connected) notify_err('没有检测到Scatter', '请安装Scatter或激活');
}