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
  const [race, setRace] = useState("");
  const [racelist, setRacelist] = useState([]);
  const [classes, setClasses] = useState("");
  const [classlist, setClasslist] = useState([]);
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

  const createCharacter = async () => {
    const res = await fetchData(
      "/api/characters",
      "PUT",
      {
        name: name,
        race: race,
        classes: classes,
        background: background,
        savingthrows: savingthrows,
        skill: skill,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
        hitpoints: hitpoints,
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
      setBackground("");
      setSavingthrows([]);
      setSkill([]);
      setStrength("");
      setDexterity("");
      setConsitution("");
      setIntelligence("");
      setWisdom("");
      setCharisma("");
      setHitpoints("");
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
        // Add the item to the array, but only if there are less than
        // four selected item
        if (prevSkills.length < 4) {
          return [...prevSkills, item.skill];
        } else {
          // Should have no change if already have four selected
          return prevSkills;
        }
      }
    });
  };

  const handleCreated = () => {
    createCharacter();
    navigate("/player");
  };

  return (
    <div>
      <div>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div>
        Class:
        <select
          name="classlist"
          id="classlist"
          value={classes}
          onChange={(e) => {
            setClasses(e.target.value);
          }}
        >
          <option value="none">please select</option>
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
        Race:
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
        Background:
        <select
          name="backgroundlist"
          id="backgroundlist"
          value={background}
          onChange={(e) => {
            setBackground(e.target.value);
          }}
        >
          <option value="none">please select</option>
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
        Saving Throws:
        {savingthrowslist.map((item, index) => (
          <label key={index}>
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

      <div>
        Skills:
        {skilllist.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={skill.includes(item.skill)}
              onChange={() => toggleSkills(item)}
              disabled={skill.length === 4 && !skill.includes(item.skill)}
            />
            {item.skill}
          </label>
        ))}
      </div>

      <button onClick={handleCreated}>Create Character</button>
    </div>
  );
};

export default CreateCharacter;
