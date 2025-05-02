import { URLS } from "@/constants";
import { axiosInstance } from "@/lib/axios";

export const forgetPassword = ({ email }: { email: string }) => {
  try {
    const data = axiosInstance.post(`${URLS.USERS}/forget-password`, { email });
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const forgetPasswordVerification = (payload: {
  email: string;
  token: string;
  password: string;
}) => {
  try {
    const data = axiosInstance.post(`${URLS.USERS}/forget-password/verify`, payload);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
