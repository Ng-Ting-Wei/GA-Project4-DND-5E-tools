import React, { useContext } from "react";
import UserContext from "../context/user";
import NavBar from "../components/NavBar";
import CharacterDisplay from "../components/CharacterDisplay";

const Player = () => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      {userCtx.userRole === "DungeonMaster" && <NavBar />}
      <CharacterDisplay></CharacterDisplay>
    </div>
  );
};

export default Player;
