import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// request interceptor
// axiosClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // do something before request is sent like headers
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.resolve(error.response?.data || error);
  }
);

class Http {
  static async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return await http.get(url, options);
  }
  static async post<T>(
    url: string,
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return await http.post(url, data, options);
  }
  static async patch<T>(
    url: string,
    data: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return await http.patch(url, data, options);
  }
  static async delete<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return await http.delete(url, options);
  }
}

export { Http };
