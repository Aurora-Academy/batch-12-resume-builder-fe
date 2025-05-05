import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: (access: string, refresh: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
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
    // Token Validation
    if (!isAuthenticated) navigate("/auth/login");
  }, [navigate, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!accessToken, logout, login, accessToken, refreshToken }}
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
