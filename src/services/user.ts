import { URLS } from "@/constants";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";

import type { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const createUser = () => {};

export const fetchUser = (id: string) => {
  const axiosInstance = createAxiosAdminFn();
  return axiosInstance.get(`${URLS.USERS}/${id}`);
};

export const updateUser = async (id: string, payload: Partial<User>): Promise<User> => {
  const axiosInstance = createAxiosAdminFn();
  const response: AxiosResponse<User> = await axiosInstance.put(`${URLS.USERS}/${id}`, payload);
  return response.data;
};
