import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";

const NPCsDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const { setUserInfo, setUserById, setUserRole, setCharacterId, userRole } =
    useInfo();
  const [npcs, setNPCs] = useState([]);

  return <div></div>;
};

export default NPCsDisplay;
