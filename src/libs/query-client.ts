import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { getEnv } from '../utils/getEnv';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const GC_TIME = 1000 * 60 * 10; // 10 minutes

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, staleTime: STALE_TIME, gcTime: GC_TIME } }
});

export const axiosInstance = axios.create({ baseURL: getEnv('API_URI', 'http://localhost:3000/api') });

export const fetcher =
  <T>(uri: string, configs?: AxiosRequestConfig): (() => Promise<T>) =>
  () =>
    axiosInstance.get<T>(uri, configs).then((res) => res.data);
