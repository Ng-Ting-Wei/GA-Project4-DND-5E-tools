import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";

const CreateCharacter = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
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
  const [maximumhitpoints, setMaximumHitpoints] = useState("");
  const [currentHitpoints, setCurrentHitpoints] = useState("");
  const [armorclass, setArmorclass] = useState("");
  const [inventory, setInventory] = useState([]);

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

  const createCharacter = async () => {
    const res = await fetchData(
      "/api/characters",
      "PUT",
      {
        name: name,
        race: race,
        classes: classes,
        feature: feature,
        level: level,
        background: background,
        savingthrows: savingthrows,
        skill: skill,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
        maximumhitpoints: maximumhitpoints,
        currenthitpoints: currentHitpoints,
        armorclass: armorclass,
        inventory: inventory,
        player: userId,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      setName("");
      setRace("");
      setClasses("");
      setFeature([]);
      setLevel("");
      setBackground("");
      setSavingthrows([]);
      setSkill([]);
      setStrength("");
      setDexterity("");
      setConsitution("");
      setIntelligence("");
      setWisdom("");
      setCharisma("");
      setMaximumHitpoints("");
      setCurrentHitpoints("");
      setArmorclass("");
      setInventory([]);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getClasslist();
    getRacelist();
    getBackgroundlist();
    getSavingthrowlist();
    getSkilllist();
  }, []);

  const toggleSavingthrow = (item) => {
    setSavingthrows((prevSavingthrows) => {
      if (prevSavingthrows.includes(item.savingthrow)) {
        // Remove the item from the array
        return prevSavingthrows.filter(
          (savingthrow) => savingthrow !== item.savingthrow
        );
      } else {
        // Add the item to the array, but only if there are less than
        // two selected item
        if (prevSavingthrows.length < 2) {
          return [...prevSavingthrows, item.savingthrow];
        } else {
          // Should have no change if already have two selected
          return prevSavingthrows;
        }
      }
    });
  };

  const toggleSkills = (item) => {
    setSkill((prevSkills) => {
      if (prevSkills.includes(item.skill)) {
        // Remove the item from the array
        return prevSkills.filter((skills) => skills !== item.skill);
      } else {
        // Add the item to the array,
        return [...prevSkills, item.skill];
      }
    });
  };

  const handleCreated = () => {
    createCharacter();
    navigate("/player");
  };

  const handleGoCharacterList = () => {
    navigate("/player");
  };

  return (
    <div>
      <div className={styles.charactercreate}>
        <div>
          <div className={styles.textbigtext}>Name:</div>
          <input
            className={styles.inputarea}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Race:</div>
          <select
            name="racelist"
            id="racelist"
            value={race}
            onChange={(e) => {
              setRace(e.target.value);
            }}
          >
            <option value="none">please select</option>
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
            name="classlist"
            id="classlist"
            value={classes}
            onChange={(e) => {
              setClasses(e.target.value);
            }}
          >
            <option value="none">please select</option>
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
          <div>
            <textarea
              // the inventory is stored as an array, and a textarea input field
              // is used to allow users to input multiple inventory items
              // separated by line breaks (\n)
              className={styles.textareainput}
              value={feature.join("\n")}
              onChange={(e) => setFeature(e.target.value.split("\n"))}
            />
          </div>
        </div>

        <div>
          <div className={styles.textbigtext}>Level:</div>
          <input
            className={styles.inputarea}
            type="number"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Background:</div>
          <select
            name="backgroundlist"
            id="backgroundlist"
            value={background}
            onChange={(e) => {
              setBackground(e.target.value);
            }}
          >
            <option value="none">please select</option>
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

        <div className={styles.savingthrowcontainer}>
          <div className={styles.textbigtext}>Savingthrows:</div>
          {savingthrowslist.map((item, index) => (
            <label className={styles.savingthrowselect} key={index}>
              <input
                type="checkbox"
                checked={savingthrows.includes(item.savingthrow)}
                onChange={() => toggleSavingthrow(item)}
                disabled={
                  savingthrows.length === 2 &&
                  !savingthrows.includes(item.savingthrow)
                }
              />
              {item.savingthrow}
            </label>
          ))}
        </div>

        <div className={styles.skillcontainer}>
          <div className={styles.textbigtext}>Skills:</div>
          {skilllist
            .sort((a, b) => a.skill.localeCompare(b.skill))
            .map((item, index) => (
              <label className={styles.skillselect} key={index}>
                <input
                  type="checkbox"
                  checked={skill.includes(item.skill)}
                  onChange={() => toggleSkills(item)}
                />
                {item.skill}
              </label>
            ))}
        </div>

        <div>
          <div className={styles.textbigtext}>Strength</div>
          <input
            className={styles.inputarea}
            type="number"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Dexterity</div>
          <input
            className={styles.inputarea}
            type="number"
            value={dexterity}
            onChange={(e) => setDexterity(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Constitution</div>
          <input
            className={styles.inputarea}
            type="number"
            value={constitution}
            onChange={(e) => setConsitution(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Intelligence</div>
          <input
            className={styles.inputarea}
            type="number"
            value={intelligence}
            onChange={(e) => setIntelligence(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Wisdom</div>
          <input
            className={styles.inputarea}
            type="number"
            value={wisdom}
            onChange={(e) => setWisdom(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Charisma</div>
          <input
            className={styles.inputarea}
            type="number"
            value={charisma}
            onChange={(e) => setCharisma(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Maximum Hitpoints</div>
          <input
            className={styles.inputarea}
            type="number"
            value={maximumhitpoints}
            onChange={(e) => setMaximumHitpoints(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Current Hitpoints</div>
          <input
            className={styles.inputarea}
            type="number"
            value={currentHitpoints}
            onChange={(e) => setCurrentHitpoints(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Armor Class</div>
          <input
            className={styles.inputarea}
            type="number"
            value={armorclass}
            onChange={(e) => setArmorclass(parseInt(e.target.value))}
          ></input>
        </div>

        <div>
          <div className={styles.textbigtext}>Inventory:</div>
          <div>
            <textarea
              // the inventory is stored as an array, and a textarea input field
              // is used to allow users to input multiple inventory items
              // separated by line breaks (\n)
              className={styles.textareainput}
              value={inventory.join("\n")}
              onChange={(e) => setInventory(e.target.value.split("\n"))}
            />
          </div>
        </div>
        <button className={styles.buttonsoncreate} onClick={handleCreated}>
          Create Character
        </button>
        <button
          className={styles.buttonsoncreate}
          onClick={handleGoCharacterList}
        >
          Go back to character list
        </button>
      </div>
    </div>
  );
};

export default CreateCharacter;
