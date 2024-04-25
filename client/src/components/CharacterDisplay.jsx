import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";

const CharacterDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const [characters, setCharacters] = useState([]);

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

  useEffect(() => {
    getCharacters();
  }, []);

  const handleCreateCharacter = () => {
    navigate("/charactercreation");
  };

  const handleTest = () => {
    console.log(characters);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">Characters</div>
      </div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterDisplay;
