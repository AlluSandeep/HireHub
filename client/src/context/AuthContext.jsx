import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("hirehub_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        setUser(data.user);

        localStorage.setItem(
          "hirehub_user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error(error);

        localStorage.removeItem("hirehub_token");
        localStorage.removeItem("hirehub_user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = (userData, token) => {
    localStorage.setItem(
      "hirehub_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "hirehub_token",
      token
    );

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("hirehub_user");
    localStorage.removeItem("hirehub_token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);