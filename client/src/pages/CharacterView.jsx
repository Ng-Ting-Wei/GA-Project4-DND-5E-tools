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
  const [racelist, setRacelist] = useState([]);
  const [classlist, setClasslist] = useState([]);
  const [backgroundlist, setBackgroundlist] = useState([]);
  const [savingthrowslist, setSavingthrowslist] = useState([]);
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

  const getClasslist = async () => {
    const res = await fetchData("/api/classlist");
    if (res.ok) {
      setClasslist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getRacelist = async () => {
    const res = await fetchData("/api/racelist");
    if (res.ok) {
      setRacelist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getBackgroundlist = async () => {
    const res = await fetchData("/api/backgroundlist");
    if (res.ok) {
      setBackgroundlist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getSavingthrowlist = async () => {
    const res = await fetchData("/api/savingthrowlist");
    if (res.ok) {
      setSavingthrowslist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getSkilllist = async () => {
    const res = await fetchData("/api/skilllist");
    if (res.ok) {
      setSkilllist(res.data);
    } else {
      console.log(res.data);
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
    getClasslist();
    getRacelist();
    getBackgroundlist();
    getSavingthrowlist();
    getSkilllist();
  }, []);

  useEffect(() => {
    getCharacter();
  }, [characterId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "feature") {
      // Split the textarea value by newline to convert it into an array
      const featureArray = value.split("\n");
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: featureArray,
      }));
    } else {
      // For other input fields, update state normally
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: value,
      }));
    }
  };

  // Reset the character state to its original values
  const handleCancel = () => {
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
                Name:
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                Race:
                <select
                  name="race"
                  value={character.race}
                  onChange={handleChange}
                >
                  {racelist.map((item, index) => {
                    return (
                      <option key={index} value={item.race}>
                        {item.race}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                Class:
                <select
                  name="class"
                  value={character.class}
                  onChange={handleChange}
                >
                  {classlist.map((item, index) => {
                    return (
                      <option key={index} value={item.classlist}>
                        {item.classlist}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                Feature:
                <textarea
                  value={character.feature}
                  name="feature"
                  onChange={handleChange}
                />
              </div>

              <div>
                Level:
                <input
                  type="number"
                  name="level"
                  value={character.level}
                  onChange={handleChange}
                />
              </div>

              <div>
                Proficiency Bonus:
                <input
                  type="number"
                  name="proficiencybonus"
                  value={character.proficiencybonus}
                  onChange={handleChange}
                />
              </div>

              <div>
                Background:
                <select
                  name="background"
                  value={character.background}
                  onChange={handleChange}
                >
                  {backgroundlist.map((item, index) => {
                    return (
                      <option key={index} value={item.background}>
                        {item.background}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                Savingthrows:
                {savingthrowslist.map((item, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={character.savingthrows.includes(
                        item.savingthrow
                      )}
                      onChange={handleChange}
                    />
                    {item.savingthrow}
                  </label>
                ))}
              </div>

              <div>
                Skills:
                {skilllist.map((item, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={character.skill.includes(item.skill)}
                      onChange={handleChange}
                    />
                    {item.skill}
                  </label>
                ))}
              </div>

              <div>
                Strength:
                <input
                  type="number"
                  name="strength"
                  value={character.strength}
                  onChange={handleChange}
                />
              </div>
              <div>
                Dexterity:
                <input
                  type="number"
                  name="dexterity"
                  value={character.dexterity}
                  onChange={handleChange}
                />
              </div>
              <div>
                Constitution:
                <input
                  type="number"
                  name="constitution"
                  value={character.constitution}
                  onChange={handleChange}
                />
              </div>
              <div>
                Intelligence:
                <input
                  type="number"
                  name="intelligence"
                  value={character.intelligence}
                  onChange={handleChange}
                />
              </div>
              <div>
                Wsdom:
                <input
                  type="number"
                  name="wisdom"
                  value={character.wisdom}
                  onChange={handleChange}
                />
              </div>
              <div>
                Charisma:
                <input
                  type="number"
                  name="charisma"
                  value={character.charisma}
                  onChange={handleChange}
                />
              </div>

              <div>
                Maximum Hitpoints:
                <input
                  type="number"
                  name="maximumhitpoints"
                  value={character.maximumhitpoints}
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
              <p>Feature: {character.feature.join(", ")}</p>
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
