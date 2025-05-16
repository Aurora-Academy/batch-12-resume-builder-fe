import { createAxiosAdmin } from "@/lib/axiosAdmin";

import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";

export const useAdminQuery = () => {
  const auth = useAuth();
  const axiosAdmin = useMemo(
    () =>
      createAxiosAdmin(
        () => ({ accessToken: auth?.accessToken, refreshToken: auth?.refreshToken }),
        auth.logout
      ),
    [auth?.accessToken, auth?.refreshToken, auth?.logout]
  );

  return axiosAdmin;
};
