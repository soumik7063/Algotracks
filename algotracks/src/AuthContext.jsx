import React, { useContext, createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsloggedin] = useState(false);
  const [user, setuser] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    setisLoading(true); 

    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setuser(data.user);
          setIsloggedin(true);
        } else {
          localStorage.removeItem("authToken");
          setIsloggedin(false);
        }
      } catch (error) {
        console.log("Error verifying authentication:", error);
        localStorage.removeItem("authToken");
        setIsloggedin(false);
      }
    } else {
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
