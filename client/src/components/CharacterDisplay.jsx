import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";

const CharacterDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const {
    setUserInfo,
    setUserById,
    setUserRole,
    setCharacterId,
    userRole,
    userName,
    setUserName,
  } = useInfo();
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
    userCtx.setUserName("");

    setUserInfo("");
    setUserById("");
    setUserRole("");
    setUserName("");

    navigate("/login");
  };

  const handleTest = () => {
    console.log(userCtx.userName);
  };

  return (
    <div>
      <div className="row">
        <h1 className={styles.characterheader}>Characters</h1>
      </div>
      <h2 className={styles.username}>User: {userCtx.userName}</h2>
      <button className={styles.logoutbutton} onClick={handleLogout}>
        Logout
      </button>
      <button
        className={styles.charactercreatebutton}
        onClick={handleCreateCharacter}
      >
        Create Character
      </button>
      {characters.map((item) => (
        <div className={styles.characterborder} key={item._id}>
          <div className={styles.characterdetail}>
            <p>Name: {item.name}</p>
            <p>Race: {item.race}</p>
            <p>Class: {item.class}</p>
            <p>Level: {item.level}</p>
            <p>
              {/* // Convert to local time in a readable format */}
              Date Created: {new Date(item.created_at).toLocaleString()}
            </p>
            <p>Character id: {item._id}</p>
            <button
              className={styles.characterbutton}
              onClick={() => handleViewCharacter(item._id)}
            >
              View Character
            </button>
            <button
              className={styles.characterbutton}
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
