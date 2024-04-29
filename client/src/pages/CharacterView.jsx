import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const CharacterView = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const characterId = userCtx.characterId;
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
        setCharacter(res.data);
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
    </div>
  );
};

export default CharacterView;
