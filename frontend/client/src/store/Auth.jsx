import { createContext, useCallback, useContext, useEffect, useState } from "react";
const URL = "http://localhost:5000/api/auth/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const logoutUser = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const userAuthentication = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsAuthLoading(false);
      return;
    }

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data?.userData || null);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.log(error);
      logoutUser();
    } finally {
      setIsAuthLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setIsAuthLoading(true);
    userAuthentication();
  }, [userAuthentication]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ storeTokenInLs, token, isLoggedIn, user, isAuthLoading, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
