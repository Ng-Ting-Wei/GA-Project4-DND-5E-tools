import React, { useContext, useState } from "react";

const InfoContext = React.createContext();

export const InfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userById, setUserById] = useState({});
  const [userRole, setUserRole] = useState({});
  const [userName, setUserName] = useState({});
  const [characterId, setCharacterId] = useState("");
  const [npcId, setNPCId] = useState("");

  const value = {
    userInfo,
    userById,
    userRole,
    userName,
    characterId,
    npcId,
    setUserInfo,
    setUserById,
    setUserRole,
    setUserName,
    setCharacterId,
    setNPCId,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

export const useInfo = () => {
  return useContext(InfoContext);
};
