import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";

const CharacterDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const { setUserInfo, setUserById, setUserRole, setCharacterId, userRole } =
    useInfo();
  const [characters, setCharacters] = useState([]);

  const getAllCharacters = async () => {
    const res = await fetchData(
      "/api/characters",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setCharacters(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getCharacters = async () => {
    const res = await fetchData(
      "/api/characters/player",
      "POST",
      {
        player: userId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setCharacters(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchUserCharacters = async () => {
    if (userCtx.userRole === "DungeonMaster") {
      await getAllCharacters();
    } else {
      await getCharacters();
    }
  };

  const deleteCharacter = async (characterId) => {
    const res = await fetchData(
      "/api/characters",
      "DELETE",
      {
        _id: userId,
        character: characterId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character._id !== characterId)
      );
      console.log("Character deleted");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchUserCharacters();
  }, [userRole]);

  const handleCreateCharacter = () => {
    navigate("/charactercreation");
  };

  const handleViewCharacter = (characterId) => {
    setCharacterId(characterId);
    navigate("/characterview");
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

  const handleTest = () => {
    console.log(characters);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">Characters</div>
      </div>
      <button onClick={handleLogout}>Logout</button>

      <button onClick={handleCreateCharacter}>Create Character</button>

      {characters.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <div>
            <span>Name: {item.name}</span>
            <span style={{ marginLeft: "10px" }}>Race: {item.race}</span>
            <span style={{ marginLeft: "10px" }}>Class: {item.class}</span>
            <span style={{ marginLeft: "10px" }}>Level: {item.level}</span>
            <span style={{ marginLeft: "10px" }}>
              {/* // Convert to local time in a readable format */}
              Date Created: {new Date(item.created_at).toLocaleString()}
            </span>
            <span style={{ marginLeft: "10px" }}>Character id: {item._id}</span>
            <button
              className="col-md-2"
              onClick={() => handleViewCharacter(item._id)}
            >
              View Character
            </button>
            <button
              className="col-md-2"
              onClick={() => deleteCharacter(item._id)}
            >
              Delete Character
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterDisplay;
