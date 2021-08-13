import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IResponse {
  code: number;
  msg: any;
}

const baseURL: string = "/api";

const api = axios.create({
  baseURL,
  timeout: 8000,
});

api.interceptors.request.use((req: AxiosRequestConfig) => {
  const token: string = localStorage.getItem("token") as string;
  return req;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    const response: IResponse = res.data;
    if (response.code !== 0) {
      console.warn(response.msg);
    }
    return res;
  },
  (err) => console.log(err)
);

export default api;
