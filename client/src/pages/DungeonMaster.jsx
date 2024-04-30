import React, { useContext } from "react";
import UserContext from "../context/user";
import NavBar from "../components/NavBar";
import NPCsDisplay from "../components/NPCsDisplay";

const DungeonMaster = () => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      {userCtx.userRole === "DungeonMaster" && <NavBar />}
      {userCtx.userRole === "DungeonMaster" && <NPCsDisplay />}
    </div>
  );
};

export default DungeonMaster;
