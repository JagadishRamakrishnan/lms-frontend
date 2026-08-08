import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getMe } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("lms_token");
      const storedUser = localStorage.getItem("lms_user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        try {
          const res = await getMe();
          setUser(res.user);
          localStorage.setItem("lms_user", JSON.stringify(res.user));
        } catch (err) {
          localStorage.removeItem("lms_token");
          localStorage.removeItem("lms_user");
          setUser(null);
        }
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem("lms_token", res.token);
    localStorage.setItem("lms_user", JSON.stringify(res.user));
    setUser(res.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await registerUser({ name, email, password });
    localStorage.setItem("lms_token", res.token);
    localStorage.setItem("lms_user", JSON.stringify(res.user));
    setUser(res.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
