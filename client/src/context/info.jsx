import React, { createContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [characterId, setCharacterId] = useState("");

  const updateCharacterID = (newCharacterId) => {
    setCharacterId(newCharacterId);
  };

  return (
    <InfoContext.Provider value={{ characterId, updateCharacterID }}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoProvider, InfoContext };
