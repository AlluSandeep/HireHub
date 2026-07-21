import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("hirehub_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  const login = (userData, token) => {
  localStorage.setItem("hirehub_user", JSON.stringify(userData));
  localStorage.setItem("hirehub_token", token);

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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);