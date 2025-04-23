import axios from "axios";
import { API_URL } from "@/constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
