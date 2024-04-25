import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import { useNavigate } from "react-router-dom";

const CreateCharacter = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const [name, setName] = useState("");
  const [race, setRace] = useState([]);
  // const [class, setClass] = useState();
  const [background, setBackground] = useState([]);
  const [savingthrows, setSavingthows] = useState([]);
  const [skill, setSkill] = useState([]);
  const [strength, setStrength] = useState();
  const [dexterity, setDexterity] = useState();
  const [constitution, setConsitution] = useState();
  const [intelligence, setIntelligence] = useState();

  const createCharacter = async () => {
    const res = await fetchData(
      "/api/characters",
      "PUT",
      {
        name,
        race,
        class: "fighter",
        background,
        savingthrows,
        skill,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom: 13,
        charisma: 12,
        hitpoints: 12,
        armorclass: 16,
        inventory: ["longsword", "bow", "20 Arrows", "Chain mail"],
        player: "6625e8c74da19164738ae814",
      },
      userCtx.accessToken
    );
  };

  const handleCreated = () => {
    navigate("/player");
  };

  return (
    <div>
      <button onClick={handleCreated}>Create Character</button>
    </div>
  );
};

export default CreateCharacter;
