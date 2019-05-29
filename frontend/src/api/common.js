import ScatterJS from 'scatterjs-core'

import { notify } from '../util/Utils';
import { appName } from './config'

export const checkConnected = async () => {
  const connected = await ScatterJS.scatter.connect(
    appName,
    { initTimeout: 5000 },
  );
  if (!connected) notify('没有检测到Scatter', '请安装Scatter或激活');
}