import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import EventEmitter from "./EventEmitter/EventEmitter";
import { ENV } from "@/configs/env.constant";

export default class ClientRequest {
  static instance: ClientRequest | null = null;

  public static getInstance(): ClientRequest {
    if (!ClientRequest.instance) {
      ClientRequest.instance = new ClientRequest();
    }
    return ClientRequest.instance;
  }

  private axiosInstance!: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.NEXT_PUBLIC_BACKEND_URL,
      timeout: 30000,
    });

    const fulfilledResponseHandler = (config: AxiosResponse<any, any>) => {
      return config;
    };
    const requestHandler = async (config: InternalAxiosRequestConfig<any>) => {
      return config;
    };

    const errorResponseHandler = (error: AxiosError) => {
      return Promise.reject(error);
    };

    this.axiosInstance.interceptors.request.use(requestHandler.bind(this));

    this.axiosInstance.interceptors.response.use(
      fulfilledResponseHandler,
      errorResponseHandler.bind(this)
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
