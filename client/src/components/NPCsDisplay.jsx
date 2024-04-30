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
  const { setUserInfo, setUserById, setUserRole, setNPCId } = useInfo();
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

    setUserInfo("");
    setUserById("");
    setUserRole("");
    navigate("/login");
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">NPCs</div>
      </div>
      <button onClick={handleLogout}>Logout</button>

      <button onClick={handleCreateNPC}>Create NPC</button>

      {npcs.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <div>
            <span>Name: {item.name}</span>
            <span style={{ marginLeft: "10px" }}>Race: {item.race}</span>
            <span style={{ marginLeft: "10px" }}>
              {/* // Convert to local time in a readable format */}
              Date Created: {new Date(item.created_at).toLocaleString()}
            </span>
            <span style={{ marginLeft: "10px" }}>NPC id: {item._id}</span>
            <button
              className="col-md-2"
              onClick={() => {
                handleViewNPC(item._id);
              }}
            >
              View NPC
            </button>
            <button className="col-md-2" onClick={() => deleteNPCs(item._id)}>
              Delete NPC
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NPCsDisplay;
