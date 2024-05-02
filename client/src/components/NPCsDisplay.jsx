import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";

const NPCsDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const { setUserInfo, setUserById, setUserRole, setNPCId, setUserName } =
    useInfo();
  const [npcs, setNPCs] = useState([]);

  const getAllNPCs = async () => {
    const res = await fetchData(
      "/api/npcs",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setNPCs(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteNPCs = async (npcsId) => {
    const res = await fetchData(
      "/api/npcs",
      "DELETE",
      {
        _id: userId,
        npcs: npcsId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setNPCs((prevNPCs) => prevNPCs.filter((npcs) => npcs._id !== npcsId));
      console.log("NPCs deleted");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getAllNPCs();
  }, []);

  const handleCreateNPC = () => {
    navigate("/npcscreation");
  };

  const handleViewNPC = (npcid) => {
    setNPCId(npcid);
    navigate("/npcsview");
  };

  const handleLogout = () => {
    userCtx.setAccessToken("");
    userCtx.setUserById("");
    userCtx.setUserRole("");
    userCtx.setUserRole("");
    userCtx.setUserName("");

    setUserInfo("");
    setUserById("");
    setUserRole("");
    setUserName("");

    navigate("/login");
  };

  return (
    <div className={styles.characterviewbackgroind}>
      <div>
        <h1 className={styles.characterheader}>NPCs</h1>
      </div>
      <h2 className={styles.username}>User: {userCtx.userName}</h2>

      <button className={styles.logoutbutton} onClick={handleLogout}>
        Logout
      </button>

      <button
        className={styles.charactercreatebutton}
        onClick={handleCreateNPC}
      >
        Create NPC
      </button>

      {npcs.map((item) => (
        <div className={styles.characterborder} key={item._id}>
          <div className={styles.characterdetail}>
            <p>Name: {item.name}</p>
            <p>Race: {item.race}</p>
            <p>
              {/* // Convert to local time in a readable format */}
              Date Created: {new Date(item.created_at).toLocaleString()}
            </p>
            <p>NPC id: {item._id}</p>
            <button
              className={styles.characterbutton}
              onClick={() => {
                handleViewNPC(item._id);
              }}
            >
              View NPC
            </button>
            <button
              className={styles.characterbutton}
              onClick={() => deleteNPCs(item._id)}
            >
              Delete NPC
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NPCsDisplay;
