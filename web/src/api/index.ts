import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

interface IResponse {
  code: number;
  msg: any;
}

const baseURL: string = "http://localhost:3000";
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
      ElMessage.warning({
        message: response.msg,
        type: "warning",
      });
      return res.data.code;
    }
    return res.data.msg;
  },
  (err) => console.log(err)
);

export default api;
