import React, { useContext } from "react";
import UserContext from "../context/user";

import CreateNPCs from "../components/CreateNPCs";

const NPCsCreation = () => {
  const userCtx = useContext(UserContext);

  return <div>{userCtx.userRole === "DungeonMaster" && <CreateNPCs />}</div>;
};

export default NPCsCreation;
