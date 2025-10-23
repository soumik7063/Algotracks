import React, { useContext, createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsloggedin] = useState(false);
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    setisLoading(true); 

    const token = localStorage.getItem("authToken");
    if (token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (data?.success && data?.user) {
      setuser(data.user);
      setIsloggedin(true);
    } else {
      localStorage.removeItem("authToken");
      setuser(null);
      setIsloggedin(false);
    }
  } catch (error) {
    console.error("Auth verification failed:", error);
    localStorage.removeItem("authToken");
    setuser(null);
    setIsloggedin(false);
  }
} else {
  setuser(null);
  setIsloggedin(false);
}


    setisLoading(false);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setuser(userData);
    setIsloggedin(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setuser(null);
    setIsloggedin(false);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
        user,
        checkLoginStatus, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
