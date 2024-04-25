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
  const [classes, setClasses] = useState("");
  const [classlist, setClasslist] = useState([]);
  const [selectedClassDetails, setSelectedClassDetails] = useState("");
  const [background, setBackground] = useState([]);
  const [savingthrows, setSavingthows] = useState([]);
  const [skill, setSkill] = useState([]);
  const [strength, setStrength] = useState();
  const [dexterity, setDexterity] = useState();
  const [constitution, setConsitution] = useState();
  const [intelligence, setIntelligence] = useState();
  const [wisdom, setWisdom] = useState();
  const [charisma, setCharisma] = useState();
  const [hitpoints, setHitpoints] = useState();
  const [armorclass, setArmorclass] = useState();
  const [inventory, setInventory] = useState([]);

  const getClasslist = async () => {
    const res = await fetchData("/api/classlist");
    if (res.ok) {
      setClasslist(res.data);
    } else {
      console.log(res.data);
    }
  };

  const createCharacter = async () => {
    const res = await fetchData(
      "/api/characters",
      "PUT",
      {
        name,
        race,
        classes,
        background,
        savingthrows,
        skill,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        hitpoints,
        armorclass,
        inventory,
        player: userId,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      setName("");
      setRace("");
      setClasses("");
      setBackground("");
      setSavingthows("");
      setSkill("");
      setStrength("");
      setDexterity("");
      setConsitution("");
      setIntelligence("");
      setWisdom("");
      setCharisma("");
      setHitpoints("");
      setArmorclass("");
      setInventory("");
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getClasslist();
  }, []);

  const handleClassSelect = (e) => {
    const selectedClass = e.target.value;
    const classDetails = classlist.find(
      (item) => item.classlist === selectedClass
    );
    setSelectedClassDetails(classDetails);
    setClasses(selectedClass);
  };

  const handleCreated = () => {
    createCharacter();
    navigate("/player");
  };

  return (
    <div>
      <div>
        <select
          name="classlist"
          id="classlist"
          value={classes}
          onChange={handleClassSelect}
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
      {/* // Render class details only when a class is selected */}
      {selectedClassDetails && (
        <div>
          <h2>Class Details</h2>
          <p>{selectedClassDetails.detail}</p>
        </div>
      )}
      <button onClick={handleCreated}>Create Character</button>
    </div>
  );
};

export default CreateCharacter;
