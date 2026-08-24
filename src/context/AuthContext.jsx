import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("hirehub_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("hirehub_user", JSON.stringify(user));
    else localStorage.removeItem("hirehub_user");
  }, [user]);

  const login = (email, role = "candidate") => {
    const account = {
      id: Date.now(),
      name: email.split("@")[0].replace(/[._-]/g, " "),
      email,
      role
    };
    setUser(account);
    return account;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);