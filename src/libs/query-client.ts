import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

const axiosInstance = axios.create({ baseURL: 'http://localhost:3000/api' });

export const fetcher =
  <T>(uri: string, confs?: AxiosRequestConfig): (() => Promise<T>) =>
  () =>
    axiosInstance.get<T>(uri, confs).then((res) => res.data);
