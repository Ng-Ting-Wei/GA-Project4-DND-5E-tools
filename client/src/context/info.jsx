import React, { createContext, useState } from "react";

const InfoContext = createContext();

const UserProvider = ({ children }) => {
  const [characterId, setCharacterId] = useState("");

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <InfoContext.Provider value={{ user, updateUser }}>
      {children}
    </InfoContext.Provider>
  );
};

export { UserProvider, InfoContext };
