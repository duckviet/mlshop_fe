import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await apiRequest.get(url);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  const response = await apiRequest.post(url, data);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  const response = await apiRequest.put(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await apiRequest.delete(url);
  return response.data;
};

export default {
  get,
  post,
  put,
  delete: del,
};
