import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";

const NPCsView = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userId = userCtx.userById;
  const { npcId } = useInfo();

  const [npc, setNPC] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [racelist, setRacelist] = useState([]);
  const [savingthrowslist, setSavingthrowslist] = useState([]);
  const [skilllist, setSkilllist] = useState([]);

  const getNPC = async () => {
    try {
      const res = await fetchData(
        `/api/npcs/id`,
        "POST",
        {
          _id: npcId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        setNPC(res.data.data);
      } else {
        console.error("Error fetching character:", res.data);
      }
    } catch (error) {
      console.error("Error fetching character:", error);
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

  const updateNPC = async () => {
    try {
      const res = await fetchData(
        `/api/npcs`,
        "PATCH",
        {
          _id: npcId,
          name: npc.name,
          race: npc.race,
          feature: npc.feature,
          proficiencybonus: npc.proficiencybonus,
          savingthrows: npc.savingthrows,
          skill: npc.skill,
          strength: npc.strength,
          dexterity: npc.dexterity,
          constitution: npc.constitution,
          intelligence: npc.intelligence,
          wisdom: npc.wisdom,
          charisma: npc.charisma,
          maximumhitpoints: npc.maximumhitpoints,
          currenthitpoints: npc.currenthitpoints,
          temporaryhitpoints: npc.temporaryhitpoints,
          armorclass: npc.armorclass,
          player: userId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        getNPC();
        setNPC(res.data.data);
        setIsEditing(false);
      } else {
        console.error("Error updating npc:", res.data);
      }
    } catch (error) {
      console.error("Error updating npc:", error);
    }
  };

  useEffect(() => {
    getRacelist();
    getSavingthrowlist();
    getSkilllist();
  }, []);

  useEffect(() => {
    getNPC();
  }, [npcId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "feature" || name === "inventory") {
      // Split the textarea value by newline to convert it into an array
      const featureArray = value.split("\n");
      setNPC((prevNPC) => ({
        ...prevNPC,
        [name]: featureArray,
      }));
    } else {
      // For other input fields, update state normally
      setNPC((prevNPC) => ({
        ...prevNPC,
        [name]: value,
      }));
    }
  };

  const handleSavingthrow = (item) => {
    setNPC((prevNPC) => {
      if (prevNPC.savingthrows.includes(item.savingthrow)) {
        // Remove the item from the array
        const updatedSavingthrows = prevNPC.savingthrows.filter(
          (savingthrow) => savingthrow !== item.savingthrow
        );
        return { ...prevNPC, savingthrows: updatedSavingthrows };
      } else {
        // Add the item to the array
        const updatedSavingthrows = [...prevNPC.savingthrows, item.savingthrow];
        return { ...prevNPC, savingthrows: updatedSavingthrows };
      }
    });
  };

  const handleSkills = (item) => {
    setNPC((prevNPC) => {
      if (prevNPC.skill.includes(item.skill)) {
        // Remove the item from the array
        return {
          ...prevNPC,
          skill: prevNPC.skill.filter((skill) => skill !== item.skill),
        };
      } else {
        // Add the item to the array
        return {
          ...prevNPC,
          skill: [...prevNPC.skill, item.skill],
        };
      }
    });
  };

  // Reset the character state to its original values
  const handleCancel = () => {
    getNPC();
    setIsEditing(false);
  };

  const handleGoCharacterList = () => {
    updateNPC();
    navigate("/dungeonmaster");
  };

  return (
    <div>
      {npc && (
        <div>
          {isEditing ? (
            <>
              <div>
                Name:
                <input
                  type="text"
                  name="name"
                  value={npc.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                Race:
                <select name="race" value={npc.race} onChange={handleChange}>
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
                Feature:
                <textarea
                  value={npc.feature}
                  name="feature"
                  onChange={handleChange}
                />
              </div>

              <div>
                Proficiency Bonus:
                <input
                  type="number"
                  name="proficiencybonus"
                  value={npc.proficiencybonus}
                  onChange={handleChange}
                />
              </div>

              <div>
                Savingthrows:
                {savingthrowslist.map((item, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={npc.savingthrows.includes(item.savingthrow)}
                      onChange={() => {
                        handleSavingthrow(item);
                      }}
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
                      checked={npc.skill.includes(item.skill)}
                      onChange={() => {
                        handleSkills(item);
                      }}
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
                  value={npc.strength}
                  onChange={handleChange}
                />
              </div>
              <div>
                Dexterity:
                <input
                  type="number"
                  name="dexterity"
                  value={npc.dexterity}
                  onChange={handleChange}
                />
              </div>
              <div>
                Constitution:
                <input
                  type="number"
                  name="constitution"
                  value={npc.constitution}
                  onChange={handleChange}
                />
              </div>
              <div>
                Intelligence:
                <input
                  type="number"
                  name="intelligence"
                  value={npc.intelligence}
                  onChange={handleChange}
                />
              </div>
              <div>
                Wisdom:
                <input
                  type="number"
                  name="wisdom"
                  value={npc.wisdom}
                  onChange={handleChange}
                />
              </div>
              <div>
                Charisma:
                <input
                  type="number"
                  name="charisma"
                  value={npc.charisma}
                  onChange={handleChange}
                />
              </div>

              <div>
                Maximum Hitpoints:
                <input
                  type="number"
                  name="maximumhitpoints"
                  value={npc.maximumhitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                Current Hitpoints:
                <input
                  type="number"
                  name="currenthitpoints"
                  value={npc.currenthitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                Temporary Hitpoints:
                <input
                  type="number"
                  name="temporaryhitpoints"
                  value={npc.temporaryhitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                Armorclass:
                <input
                  type="number"
                  name="armorclass"
                  value={npc.armorclass}
                  onChange={handleChange}
                />
              </div>

              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <div>
              <h1>{npc.name}</h1>
              <p>Race: {npc.race}</p>
              <p>Feature: {npc.feature.join(", ")}</p>
              <p>Proficiency Bonus: {npc.proficiencybonus}</p>
              <p>Saving Throws: {npc.savingthrows.join(", ")}</p>
              <p>Skills: {npc.skill.join(", ")}</p>
              <p>Strength: {npc.strength}</p>
              <p>Dexterity: {npc.dexterity}</p>
              <p>Constitution: {npc.constitution}</p>
              <p>Intelligence: {npc.intelligence}</p>
              <p>Wisdom: {npc.wisdom}</p>
              <p>Charisma: {npc.charisma}</p>
              <p>Maximum Points: {npc.maximumhitpoints}</p>
              <p>
                Current Points:
                <input
                  type="number"
                  name="currenthitpoints"
                  value={npc.currenthitpoints}
                  onChange={handleChange}
                />
              </p>
              <p>
                Temporary Hit Points:
                <input
                  type="number"
                  name="temporaryhitpoints"
                  value={npc.temporaryhitpoints}
                  onChange={handleChange}
                />
              </p>
              <p>
                Armor Class:
                <input
                  type="number"
                  name="armorclass"
                  value={npc.armorclass}
                  onChange={handleChange}
                />
              </p>
              <p>Player: {npc.player}</p>
              <p>Created At: {new Date(npc.created_at).toLocaleString()}</p>
              <button onClick={handleGoCharacterList}>
                Go back to npc list
              </button>
            </div>
          )}
        </div>
      )}

      <button onClick={isEditing ? updateNPC : handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default NPCsView;
