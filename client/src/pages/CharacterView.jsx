import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const CharacterView = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const [characterDetail, setCharacterDetail] = useState(null);

  const getCharacter = async () => {
    try {
      const res = await fetchData(
        // Use characterId to fetch character details
        `/api/characters/id`,
        "POST",
        {
          _id: characterId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        setCharacter(res.data); // Set character details in state
      } else {
        console.error("Error fetching character:", res.data);
      }
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return <div></div>;
};

export default CharacterView;
