import { URLS } from "@/constants";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";

import type { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const createUser = (payload: Omit<User, "id" | "createdAt" | "updatedAt">) => {
  const axiosInstance = createAxiosAdminFn();
  return axiosInstance.post(`${URLS.USERS}`, payload);
};

export const fetchUsers = () => {
  const axiosInstance = createAxiosAdminFn();
  return axiosInstance.get(`${URLS.USERS}`);
};

export const fetchUser = (id: string) => {
  const axiosInstance = createAxiosAdminFn();
  return axiosInstance.get(`${URLS.USERS}/${id}`);
};

export const updateUserByID = async (_id: string, payload: Partial<User>): Promise<User> => {
  const axiosInstance = createAxiosAdminFn();
  const response: AxiosResponse<User> = await axiosInstance.put(`${URLS.USERS}/${_id}`, payload);
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const { _id, ...rest } = userData;
  const axiosInstance = createAxiosAdminFn();
  const response: AxiosResponse<User> = await axiosInstance.put(`${URLS.USERS}/${_id}`, rest);
  return response.data;
};
