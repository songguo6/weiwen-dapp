import ScatterJS from 'scatterjs-core'
import { notification } from 'antd';
import { app_name } from './config'

const notify = () => {
  notification.error({
    message: '没有检测到Scatter',
    description: '请安装Scatter或激活',
  });
};

export const checkConnected = async () => {
  const connected = await ScatterJS.scatter.connect(
    app_name,
    { initTimeout: 5000 },
  );
  if (!connected) notify();
}