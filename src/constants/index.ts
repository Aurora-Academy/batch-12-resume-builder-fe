export const BASE_URL = import.meta.env.VITE_API_URL;
export const API_URL = BASE_URL.concat("/api/v1");

export const URLS = {
  USERS: API_URL + "/users",
  RESUMES: API_URL + "/resumes",
  PROFILE: API_URL + "/users/profile",
};
