import axios, { AxiosInstance, AxiosError } from "axios";
import { API_URL } from "@/constants";
import { decodeJWT } from "@/lib/jwt";
import { getItem } from "./storage";

type AuthProvider = () => {
  accessToken: string | null;
  refreshToken: string | null;
};

type LogoutFn = () => void;

const attachRequestInterceptor = (instance: AxiosInstance, getAccessToken: () => string | null) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers = config.headers || {};
        (config.headers as any).access_token = `${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const attachResponseInterceptor = (
  instance: AxiosInstance,
  getAuth: AuthProvider,
  logout?: LogoutFn
) => {
  instance.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {
      const originalRequest = err.config as any;
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

          originalRequest.headers.access_token = `${newAccess}`;
          return instance(originalRequest);
        } catch (e) {
          console.log("Token refresh failed", e);
          if (logout) logout();
          return Promise.reject(e);
        }
      }

      return Promise.reject(err);
    }
  );
};

export const createAxiosAdmin = (getAuth: AuthProvider, logout: LogoutFn) => {
  const axiosAdmin = axios.create({ baseURL: API_URL });

  attachRequestInterceptor(axiosAdmin, () => getAuth().accessToken);
  attachResponseInterceptor(axiosAdmin, getAuth, logout);

  return axiosAdmin;
};

export const createAxiosAdminFn = () => {
  const getAuth = (): { accessToken: string | null; refreshToken: string | null } => ({
    accessToken: getItem(),
    refreshToken: getItem("refresh_token"),
  });

  const axiosAdmin = axios.create({ baseURL: API_URL });

  attachRequestInterceptor(axiosAdmin, () => getAuth().accessToken);
  attachResponseInterceptor(axiosAdmin, getAuth);

  return axiosAdmin;
};
