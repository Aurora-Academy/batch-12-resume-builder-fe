import axios from "axios";
import { API_URL } from "@/constants";
import { decodeJWT } from "@/lib/jwt";
import { getItem } from "./storage";

export const createAxiosAdmin = (
  getAuth: () => {
    accessToken: string | null;
    refreshToken: string | null;
  },
  logout: () => void
) => {
  const axiosAdmin = axios.create({
    baseURL: API_URL,
  });

  // Request Interceptor
  axiosAdmin.interceptors.request.use(
    function (config) {
      const { accessToken } = getAuth();
      if (accessToken) {
        config.headers.access_token = `${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosAdmin.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;
      const { accessToken, refreshToken } = getAuth();
      if (refreshToken && err.response?.status === 500 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data }: any = decodeJWT(accessToken);
          const res = await axios.post(`${API_URL}/users/refresh`, {
            refresh_token: refreshToken,
            email: data?.email,
          });

          const newAccess = res?.data?.access_token;
          const newRefresh = res?.data?.refresh_token;

          localStorage.setItem("access_token", newAccess);
          localStorage.setItem("refresh_token", newRefresh);
          originalRequest.headers.access_token = `${accessToken}`;
          return axiosAdmin(originalRequest);
        } catch (e) {
          console.log("Token refresh failed", e);
          // Logout
          logout();
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdmin;
};

export const createAxiosAdminFn = () => {
  const axiosAdmin = axios.create({
    baseURL: API_URL,
  });

  // Request Interceptor
  axiosAdmin.interceptors.request.use(
    function (config) {
      const accessToken = getItem();
      if (accessToken) {
        config.headers.access_token = `${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosAdmin.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;
      const accessToken = getItem();
      const refreshToken = getItem("refresh_token");
      if (refreshToken && err.response?.status === 500 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data }: any = decodeJWT(accessToken);
          const res = await axios.post(`${API_URL}/users/refresh`, {
            refresh_token: refreshToken,
            email: data?.email,
          });

          const newAccess = res?.data?.access_token;
          const newRefresh = res?.data?.refresh_token;

          localStorage.setItem("access_token", newAccess);
          localStorage.setItem("refresh_token", newRefresh);
          originalRequest.headers.access_token = `${accessToken}`;
          return axiosAdmin(originalRequest);
        } catch (e) {
          console.log("Token refresh failed", e);
          return Promise.reject(e);
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdmin;
};
