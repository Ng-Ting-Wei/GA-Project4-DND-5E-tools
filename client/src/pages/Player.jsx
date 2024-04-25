import React, { useState, useContext, useEffect } from "react";
import { useInfo } from "../context/info";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import CharacterDisplay from "../components/CharacterDisplay";

const Player = () => {
  const {
    isLoggedIn,
    token,
    userInfo,
    userById,
    userRole,
    storeToken,
    storeUser,
    login,
    logout,
    setUserInfo,
    setUserById,
    setUserRole,
  } = useInfo();

  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const userId = userCtx.userById;
  const test01 = userCtx.userById;

  const handleTest = () => {
    console.log(test01);
  };

  return (
    <div>
      {userCtx.userRole === "DungeonMaster" && <NavBar />}
      <CharacterDisplay></CharacterDisplay>
      {/* <button onClick={handleTest}>Test Button</button> */}
    </div>
  );
};

export default Player;
