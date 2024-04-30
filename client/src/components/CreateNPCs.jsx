import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

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
    const res = await fetchData("/api/racelist");
    if (res.ok) {
      setRacelist(res.data);
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
    createNPCs();
    navigate("/dungeonmaster");
  };

  const handleGoCharacterList = () => {
    navigate("/dungeonmaster");
  };

  return <div></div>;
};

export default CreateNPCs;
