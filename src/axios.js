import axios from 'axios';
import { getUserCookie } from '@/utils/userCookie';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/admin/v2/'
});
instance.interceptors.request.use(
  config => {
    // console.log(config);
    config.headers.Authorization = getUserCookie().token;
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => {
    console.log(response);
    if (response.data.meta.status === '400') {
      return Promise.reject(response.data.meta.message);
    } else {
      return response.data;
    }
  },
  err => Promise.reject(err)
);
export default instance;
