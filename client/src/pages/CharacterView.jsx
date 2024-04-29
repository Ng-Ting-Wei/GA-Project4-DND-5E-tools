import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";

const CharacterView = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const { characterId } = useInfo();

  const [character, setCharacter] = useState("");

  const getCharacter = async () => {
    try {
      const res = await fetchData(
        `/api/characters/id`,
        "POST",
        {
          _id: characterId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        setCharacter(res.data.data);
      } else {
        console.error("Error fetching character:", res.data);
      }
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  useEffect(() => {
    getCharacter();
  }, [characterId]);

  return (
    <div>
      {character.map((item) => {
        <div key={character._id}>
          <input type="test" value={character.name}></input>
        </div>;
      })}
    </div>
  );
};

export default CharacterView;
