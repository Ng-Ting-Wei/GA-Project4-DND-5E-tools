import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";

const CreateNPCs = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [racelist, setRacelist] = useState([]);
  const [feature, setFeature] = useState([]);
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

  const createNPCs = async () => {
    const res = await fetchData(
      "/api/npcs",
      "PUT",
      {
        name: name,
        race: race,
        feature: feature,
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
        player: userId,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      setName("");
      setRace("");
      setFeature([]);
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
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getRacelist();
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
        return [...prevSavingthrows, item.savingthrow];
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
    createNPCs();
    navigate("/dungeonmaster");
  };

  const handleGoNPCList = () => {
    navigate("/dungeonmaster");
  };

  return (
    <div>
      <div className={styles.charactercreate}>
        <div>
          <div className={styles.textbigtext}>Name:</div>
          <input
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
          <div className={styles.textbigtext}>Feature:</div>
          <textarea
            // the inventory is stored as an array, and a textarea input field
            // is used to allow users to input multiple inventory items
            // separated by line breaks (\n)
            className={styles.textareainput}
            value={feature.join("\n")}
            onChange={(e) => setFeature(e.target.value.split("\n"))}
          />
        </div>

        <div className={styles.savingthrowcontainer}>
          <div className={styles.textbigtext}>Savingthrows:</div>
          {savingthrowslist.map((item, index) => (
            <label className={styles.savingthrowselect} key={index}>
              <input
                type="checkbox"
                checked={savingthrows.includes(item.savingthrow)}
                onChange={() => toggleSavingthrow(item)}
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
          <div className={styles.textbigtext}>Armor Class:</div>
          <input
            className={styles.inputarea}
            type="number"
            value={armorclass}
            onChange={(e) => setArmorclass(parseInt(e.target.value))}
          ></input>
        </div>

        <button className={styles.buttonsoncreate} onClick={handleCreated}>
          Create NPC
        </button>
        <button className={styles.buttonsoncreate} onClick={handleGoNPCList}>
          Go back to NPC list
        </button>
      </div>
    </div>
  );
};

export default CreateNPCs;
