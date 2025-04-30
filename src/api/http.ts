import axios, {AxiosRequestConfig} from 'axios';
import {getToken, removeToken} from '../store/authStore';

const BASE_URL = 'http://localhost:7777';
const DEFAULT_TIMEOUT = 30000;

//  HTTP client 설정
export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    res => {
      return res;
    },
    err => {
      if (err.res.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

// 공통 요청 부분
export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T,
) => {
  let res;

  switch (method) {
    case 'post':
      res = await httpClient.post(url, payload);
      break;

    case 'get':
      res = await httpClient.get(url);
      break;

    case 'put':
      res = await httpClient.put(url, payload);
      break;

    case 'delete':
      res = await httpClient.delete(url);
      break;
  }

  return res.data;
};
