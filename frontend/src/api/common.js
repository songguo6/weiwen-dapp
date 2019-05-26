import ScatterJS from 'scatterjs-core'

import { notify } from '../util/Utils';
import { app_name } from './config'

export const checkConnected = async () => {
  const connected = await ScatterJS.scatter.connect(
    app_name,
    { initTimeout: 5000 },
  );
  if (!connected) notify('没有检测到Scatter', '请安装Scatter或激活');
}