import React, { useState, useContext, useEffect } from "react";
import { useInfo } from "../context/info";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";

const DungeonMaster = () => {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
};

export default DungeonMaster;
