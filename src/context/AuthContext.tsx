import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { URLS } from "@/constants";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  roles: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: (access: string, refresh: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh_token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("access_token")
  );
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const axiosAdmin = () => createAxiosAdminFn();
        const { data } = await axiosAdmin().get(URLS.PROFILE);
        setUser(data.data);
      } catch (e) {
        console.error("Profile fetch Error:", e);
        logout();
      }
    };
    if (accessToken && !user) {
      fetchProfile();
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/login");
  }, [navigate, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!accessToken, logout, login, accessToken, refreshToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be wrapped within AuthProvider");
  return context;
};
