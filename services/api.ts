import axios, { AxiosError, AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import ErrorProvider, { MyErrors, RenderMethod } from './errors';

export const getAccessToken = async () => {
  const session: any = await getSession();
  // console.info("session : ", session);
  return "Bearer " + session?.user.token;
}

const config: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: '*',
    'Content-Type': 'application/json',
  }
})

const axiosConfig = (token?: string) => {
  config.interceptors.request.use(
    async (config: any) => {
      config.headers.Authorization = token ?? (await getAccessToken());;
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  config.interceptors.response.use(
    (config: any) => {
      // if (!config.headers.Authorization) {
      //   const token = JSON.parse(localStorage.getItem("keyCloak")).token;

      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }
      // }
      return config;
    },
    (error: AxiosError<any>) => {
      ErrorProvider.init(RenderMethod.alert, error);
      throw Promise.reject(error);
    }
  );

  return config
}


export default axiosConfig;