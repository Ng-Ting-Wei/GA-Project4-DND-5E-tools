import React, { createContext, useState } from "react";

const InfoContext = createContext();

const UserProvider = ({ children }) => {
  const [characterId, setCharacterId] = useState("");

  const updateCharacterID = (newCharacterData) => {
    setCharacterId((prevCharacterData) => ({
      ...prevCharacterData,
      ...newCharacterData,
    }));
  };

  return (
    <InfoContext.Provider value={{ characterId, updateCharacterID }}>
      {children}
    </InfoContext.Provider>
  );
};

export { UserProvider, InfoContext };
