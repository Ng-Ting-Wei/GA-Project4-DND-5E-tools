import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import styles from "../components/Style.module.css";

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
    const res = await fetchData(
      "/api/classlist",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setClasslist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getRacelist = async () => {
    const res = await fetchData(
      "/api/racelist",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setRacelist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getBackgroundlist = async () => {
    const res = await fetchData(
      "/api/backgroundlist",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setBackgroundlist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getSavingthrowlist = async () => {
    const res = await fetchData(
      "/api/savingthrowlist",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setSavingthrowslist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getSkilllist = async () => {
    const res = await fetchData(
      "/api/skilllist",
      "GET",
      undefined,
      userCtx.accessToken
    );
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
          maximumhitpoints: character.maximumhitpoints,
          currenthitpoints: character.currenthitpoints,
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

    if (name === "feature" || name === "inventory") {
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

  const handleSavingthrow = (item) => {
    setCharacter((prevCharacter) => {
      if (prevCharacter.savingthrows.includes(item.savingthrow)) {
        // Remove the item from the array
        const updatedSavingthrows = prevCharacter.savingthrows.filter(
          (savingthrow) => savingthrow !== item.savingthrow
        );
        return { ...prevCharacter, savingthrows: updatedSavingthrows };
      } else {
        // Add the item to the array
        const updatedSavingthrows = [
          ...prevCharacter.savingthrows,
          item.savingthrow,
        ];
        return { ...prevCharacter, savingthrows: updatedSavingthrows };
      }
    });
  };

  const handleSkills = (item) => {
    setCharacter((prevCharacter) => {
      if (prevCharacter.skill.includes(item.skill)) {
        // Remove the item from the array
        return {
          ...prevCharacter,
          skill: prevCharacter.skill.filter((skill) => skill !== item.skill),
        };
      } else {
        // Add the item to the array
        return {
          ...prevCharacter,
          skill: [...prevCharacter.skill, item.skill],
        };
      }
    });
  };

  // Reset the character state to its original values
  const handleCancel = () => {
    getCharacter();
    setIsEditing(false);
  };

  const handleGoCharacterList = () => {
    updateCharacter();
    navigate("/player");
  };

  return (
    <div>
      {character && (
        <div className={styles.charactercreate}>
          {isEditing ? (
            <>
              <div>
                <div className={styles.textbigtext}>Name:</div>
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Race:</div>
                <select
                  name="race"
                  value={character.race}
                  onChange={handleChange}
                >
                  {racelist
                    .sort((a, b) => a.race.localeCompare(b.race))
                    .map((item, index) => {
                      return (
                        <option key={index} value={item.race}>
                          {item.race}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <div className={styles.textbigtext}>Class:</div>
                <select
                  name="class"
                  value={character.class}
                  onChange={handleChange}
                >
                  {classlist
                    .sort((a, b) => a.classlist.localeCompare(b.classlist))
                    .map((item, index) => {
                      return (
                        <option key={index} value={item.classlist}>
                          {item.classlist}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <div className={styles.textbigtext}>Feature:</div>
                <textarea
                  className={styles.textareainput}
                  value={character.feature}
                  name="feature"
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Level:</div>
                <input
                  type="number"
                  name="level"
                  value={character.level}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Proficiency Bonus:</div>
                <input
                  type="number"
                  name="proficiencybonus"
                  value={character.proficiencybonus}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Background:</div>
                <select
                  name="background"
                  value={character.background}
                  onChange={handleChange}
                >
                  {backgroundlist
                    .sort((a, b) => a.background.localeCompare(b.background))
                    .map((item, index) => {
                      return (
                        <option key={index} value={item.background}>
                          {item.background}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <div className={styles.textbigtext}>Savingthrows:</div>
                {savingthrowslist.map((item, index) => (
                  <label className={styles.savingthrowselect} key={index}>
                    <input
                      type="checkbox"
                      checked={character.savingthrows.includes(
                        item.savingthrow
                      )}
                      onChange={() => {
                        handleSavingthrow(item);
                      }}
                    />
                    {item.savingthrow}
                  </label>
                ))}
              </div>

              <div>
                <div className={styles.textbigtext}>Skills:</div>
                {skilllist
                  .sort((a, b) => a.skill.localeCompare(b.skill))
                  .map((item, index) => (
                    <label className={styles.skillselect} key={index}>
                      <input
                        type="checkbox"
                        checked={character.skill.includes(item.skill)}
                        onChange={() => {
                          handleSkills(item);
                        }}
                      />
                      {item.skill}
                    </label>
                  ))}
              </div>

              <div>
                <div className={styles.textbigtext}>Strength</div>
                <input
                  type="number"
                  name="strength"
                  value={character.strength}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Dexterity</div>
                <input
                  type="number"
                  name="dexterity"
                  value={character.dexterity}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Constitution</div>
                <input
                  type="number"
                  name="constitution"
                  value={character.constitution}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Intelligence</div>
                <input
                  type="number"
                  name="intelligence"
                  value={character.intelligence}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Wisdom</div>
                <input
                  type="number"
                  name="wisdom"
                  value={character.wisdom}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Charisma</div>
                <input
                  type="number"
                  name="charisma"
                  value={character.charisma}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Maximum Hitpoints</div>
                <input
                  type="number"
                  name="maximumhitpoints"
                  value={character.maximumhitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Current Hitpoints</div>

                <input
                  type="number"
                  name="currenthitpoints"
                  value={character.currenthitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Temporary Hitpoints</div>
                <input
                  type="number"
                  name="temporaryhitpoints"
                  value={character.temporaryhitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Armorclass</div>
                <input
                  type="number"
                  name="armorclass"
                  value={character.armorclass}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Inventory:</div>
                <textarea
                  className={styles.textareainput}
                  value={character.inventory}
                  name="inventory"
                  onChange={handleChange}
                />
              </div>

              <button
                className={styles.buttonsoncreate2}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <div>
              <h1>{character.name}</h1>
              <p className={styles.textslightbigtext}>Race: {character.race}</p>
              <p className={styles.textslightbigtext}>
                Class: {character.class}
              </p>
              <p className={styles.textslightbigtext}>Feature:</p>
              <div>
                {character.feature.map((item, index) => (
                  <p className={styles.textareadisplay} key={index}>
                    {item}
                  </p>
                ))}
              </div>

              <p className={styles.textslightbigtext}>
                Level: {character.level}
              </p>
              <p className={styles.textslightbigtext}>
                Background: {character.background}
              </p>
              <p className={styles.textslightbigtext}>
                Proficiency Bonus: {character.proficiencybonus}
              </p>
              <p className={styles.textslightbigtext}>
                Saving Throws: {character.savingthrows.join(", ")}
              </p>
              <p className={styles.textslightbigtext}>
                Skills: {character.skill.join(", ")}
              </p>
              <p className={styles.textslightbigtext}>
                Strength {character.strength}
              </p>
              <p className={styles.textslightbigtext}>
                Dexterity {character.dexterity}
              </p>
              <p className={styles.textslightbigtext}>
                Constitution {character.constitution}
              </p>
              <p className={styles.textslightbigtext}>
                Intelligence {character.intelligence}
              </p>
              <p className={styles.textslightbigtext}>
                Wisdom {character.wisdom}
              </p>
              <p className={styles.textslightbigtext}>
                Charisma {character.charisma}
              </p>
              <p className={styles.textslightbigtext}>
                Maximum Points {character.maximumhitpoints}
              </p>
              <p className={styles.textslightbigtext}>
                Current Points
                <input
                  type="number"
                  name="currenthitpoints"
                  value={character.currenthitpoints}
                  onChange={handleChange}
                />
              </p>
              <p className={styles.textslightbigtext}>
                Temporary Hit Points
                <input
                  type="number"
                  name="temporaryhitpoints"
                  value={character.temporaryhitpoints}
                  onChange={handleChange}
                />
              </p>
              <p className={styles.textslightbigtext}>
                Armor Class
                <input
                  type="number"
                  name="armorclass"
                  value={character.armorclass}
                  onChange={handleChange}
                />
              </p>
              <p className={styles.textslightbigtext}>Inventory:</p>
              <p className={styles.textareadisplay}>
                {character.inventory.join(" , ")}
              </p>
              <textarea
                className={styles.textareainput}
                value={character.inventory}
                name="inventory"
                onChange={handleChange}
              />
              <p>Player: {character.player}</p>
              <p>
                Created At: {new Date(character.created_at).toLocaleString()}
              </p>
              <button
                className={styles.buttonsoncreate2}
                onClick={handleGoCharacterList}
              >
                Go back to character list
              </button>
            </div>
          )}
        </div>
      )}

      <button
        className={styles.savebutton}
        onClick={isEditing ? updateCharacter : handleEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default CharacterView;
