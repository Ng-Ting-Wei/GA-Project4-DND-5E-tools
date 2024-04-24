import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";

const CharacterDisplay = () => {
  const userCtx = useContext(UserContext);
  const [characters, setCharacters] = useState([]);
  const fetchData = useFetch();

  const getCharacters = async () => {
    const res = await fetchData(
      "/api/characters/player",
      undefined,
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setCharacters(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-3">Name</div>
        <div className="col-md-3">Race</div>
        <div className="col-md-3">Class</div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
