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
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [racelist, setRacelist] = useState([]);
  const [classes, setClasses] = useState("");
  const [classlist, setClasslist] = useState([]);
  const [feature, setFeature] = useState([]);
  const [level, setLevel] = useState("");
  const [background, setBackground] = useState("");
  const [backgroundlist, setBackgroundlist] = useState([]);
  const [savingthrows, setSavingthrows] = useState([]);
  const [savingthrowslist, setSavingthrowslist] = useState([]);
  const [skill, setSkill] = useState([]);
  const [skilllist, setSkilllist] = useState([]);
  const [strength, setStrength] = useState("");
  const [dexterity, setDexterity] = useState("");
  const [constitution, setConsitution] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [wisdom, setWisdom] = useState("");
  const [charisma, setCharisma] = useState("");
  const [hitpoints, setHitpoints] = useState("");
  const [armorclass, setArmorclass] = useState("");
  const [inventory, setInventory] = useState([]);

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

  const handleGoCharacterList = () => {
    navigate("/player");
  };

  return (
    <div>
      {character && (
        <div>
          <h1>{character.name}</h1>
          <p>Race: {character.race}</p>
          <p>Class: {character.class}</p>
          <p>Level: {character.level}</p>
          <p>Background: {character.background}</p>
          <p>Proficiency Bonus: {character.proficiencybonus}</p>
          <p>Saving Throws: {character.savingthrows.join(", ")}</p>
          <p>Skills: {character.skill.join(", ")}</p>
          <p>Strength: {character.strength}</p>
          <p>Dexterity: {character.dexterity}</p>
          <p>Constitution: {character.constitution}</p>
          <p>Intelligence: {character.intelligence}</p>
          <p>Wisdom: {character.wisdom}</p>
          <p>Charisma: {character.charisma}</p>
          <p>Hit Points: {character.hitpoints}</p>
          <p>Temporary Hit Points: {character.temporaryhitpoints}</p>
          <p>Armor Class: {character.armorclass}</p>
          <p>Inventory: {character.inventory.join(", ")}</p>
          <p>Player: {character.player}</p>
          <p>Created At: {new Date(character.created_at).toLocaleString()}</p>
        </div>
      )}

      <button>Edit</button>
      <button onClick={handleGoCharacterList}>Go back to character list</button>
    </div>
  );
};

export default CharacterView;
