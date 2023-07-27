import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Constant from '../helper/appConstant';
import Config from 'react-native-config';

let axiosInstance = axios.create({
  baseURL: Config.API_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

function network() {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      resolve(state.isConnected);
    });
  });
}

axiosInstance.interceptors.request.use(
  async config => {
    /** In dev, intercepts request and logs it into console for dev */
    if (await network()) {
      return config;
    } else {
      return Promise.reject(Constant.internetConnectionError);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('main error log-------', error, error?.response.data.message);
    if (error?.response.data.message) {
      return Promise.reject(error.response.data.message);
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
