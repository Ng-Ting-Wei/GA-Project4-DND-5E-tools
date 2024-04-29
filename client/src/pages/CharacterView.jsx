import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";

const CharacterView = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const { characterId } = useInfo();

  const [character, setCharacter] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const updateCharacter = async () => {
    try {
      const res = await fetchData(
        `/api/characters`,
        "PATCH",
        {
          _id: characterId,
          name: character.name,
          race: character.race,
          class: character.class,
          subclass: character.subclass,
          feature: character.feature,
          level: character.level,
          proficiencybonus: character.proficiencybonus,
          background: character.background,
          savingthrows: character.savingthrows,
          skill: character.skill,
          strength: character.strength,
          dexterity: character.dexterity,
          constitution: character.constitution,
          intelligence: character.intelligence,
          wisdom: character.wisdom,
          charisma: character.charisma,
          hitpoints: character.hitpoints,
          temporaryhitpoints: character.temporaryhitpoints,
          armorclass: character.armorclass,
          inventory: character.inventory,
          player: userId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        getCharacter();
        setCharacter(res.data.data);
        setIsEditing(false);
      } else {
        console.error("Error updating character:", res.data);
      }
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  useEffect(() => {
    getCharacter();
  }, [characterId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    // Reset the character state to its original values
    getCharacter();
    setIsEditing(false);
  };

  const handleGoCharacterList = () => {
    navigate("/player");
  };

  return (
    <div>
      {character && (
        <div>
          {isEditing ? (
            <>
              <div>
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="level"
                  value={character.level}
                  onChange={handleChange}
                />
              </div>

              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
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
              <p>
                Created At: {new Date(character.created_at).toLocaleString()}
              </p>
              <button onClick={handleGoCharacterList}>
                Go back to character list
              </button>
            </div>
          )}
        </div>
      )}

      <button onClick={isEditing ? updateCharacter : handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default CharacterView;
