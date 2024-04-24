import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userById, setUserById] = useState({});

  const storeToken = (token) => {
    setToken(token);
  };

  const storeUser = (user) => {
    setUserInfo(user);
  };

  const login = (token, user) => {
    setIsLoggedIn(true);
    setToken(token);
    setUserInfo(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    setUserInfo({});
  };

  const value = {
    isLoggedIn,
    token,
    userInfo,
    userById,
    accessToken,
    setAccessToken,
    storeToken,
    storeUser,
    login,
    logout,
    setUserInfo,
    setUserById,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
  return useContext(UserContext);
};

export default UserContext;
