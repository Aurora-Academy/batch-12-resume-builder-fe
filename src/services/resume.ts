import { URLS } from "@/constants";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";

export const saveResume = (payload: any) => {
  const axiosInstance = createAxiosAdminFn();
  return axiosInstance.post(`${URLS.RESUMES}`, payload);
};
