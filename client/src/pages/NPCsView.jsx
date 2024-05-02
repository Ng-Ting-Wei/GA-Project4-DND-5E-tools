import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import styles from "../components/Style.module.css";

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
        <div className={styles.charactercreate}>
          {isEditing ? (
            <>
              <div>
                <div className={styles.textbigtext}>Name:</div>
                <input
                  type="text"
                  name="name"
                  value={npc.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Race:</div>
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
                <div className={styles.textbigtext}>Feature:</div>
                <textarea
                  className={styles.textareainput}
                  value={npc.feature}
                  name="feature"
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Proficiency Bonus:</div>
                <input
                  type="number"
                  name="proficiencybonus"
                  value={npc.proficiencybonus}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Savingthrows:</div>
                {savingthrowslist.map((item, index) => (
                  <label className={styles.savingthrowselect} key={index}>
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
                <div className={styles.textbigtext}>Skills:</div>
                {skilllist
                  .sort((a, b) => a.skill.localeCompare(b.skill))
                  .map((item, index) => (
                    <label className={styles.skillselect} key={index}>
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
                <div className={styles.textbigtext}>Strength</div>
                <input
                  type="number"
                  name="strength"
                  value={npc.strength}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={styles.textbigtext}>Dexterity</div>
                <input
                  type="number"
                  name="dexterity"
                  value={npc.dexterity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={styles.textbigtext}>Constitution</div>
                <input
                  type="number"
                  name="constitution"
                  value={npc.constitution}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={styles.textbigtext}>Intelligence</div>
                <input
                  type="number"
                  name="intelligence"
                  value={npc.intelligence}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={styles.textbigtext}>Wisdom</div>
                <input
                  type="number"
                  name="wisdom"
                  value={npc.wisdom}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={styles.textbigtext}>Charisma</div>
                <input
                  type="number"
                  name="charisma"
                  value={npc.charisma}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Maximum Hitpoints</div>
                <input
                  type="number"
                  name="maximumhitpoints"
                  value={npc.maximumhitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Current Hitpoints</div>
                <input
                  type="number"
                  name="currenthitpoints"
                  value={npc.currenthitpoints}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className={styles.textbigtext}>Armorclass</div>
                <input
                  type="number"
                  name="armorclass"
                  value={npc.armorclass}
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
              <h1>{npc.name}</h1>
              <p className={styles.textslightbigtext}>Race: {npc.race}</p>
              <p className={styles.textslightbigtext}>Feature:</p>
              <div>
                {npc.feature.map((item, index) => (
                  <p className={styles.textareadisplay} key={index}>
                    {item}
                  </p>
                ))}
              </div>
              <p className={styles.textslightbigtext}>
                Proficiency Bonus: {npc.proficiencybonus}
              </p>
              <p className={styles.textslightbigtext}>
                Saving Throws: {npc.savingthrows.join(", ")}
              </p>
              <p className={styles.textslightbigtext}>
                Skills: {npc.skill.join(", ")}
              </p>
              <p className={styles.textslightbigtext}>
                Strength {npc.strength}
              </p>
              <p className={styles.textslightbigtext}>
                Dexterity {npc.dexterity}
              </p>
              <p className={styles.textslightbigtext}>
                Constitution {npc.constitution}
              </p>
              <p className={styles.textslightbigtext}>
                Intelligence {npc.intelligence}
              </p>
              <p className={styles.textslightbigtext}>Wisdom {npc.wisdom}</p>
              <p className={styles.textslightbigtext}>
                Charisma {npc.charisma}
              </p>
              <p className={styles.textslightbigtext}>
                Maximum Points {npc.maximumhitpoints}
              </p>
              <p className={styles.textslightbigtext}>
                Current Points
                <input
                  type="number"
                  name="currenthitpoints"
                  value={npc.currenthitpoints}
                  onChange={handleChange}
                />
              </p>
              <p className={styles.textslightbigtext}>
                Armor Class
                <input
                  type="number"
                  name="armorclass"
                  value={npc.armorclass}
                  onChange={handleChange}
                />
              </p>
              <p>Player: {npc.player}</p>
              <p>Created At: {new Date(npc.created_at).toLocaleString()}</p>
              <button
                className={styles.buttonsoncreate2}
                onClick={handleGoCharacterList}
              >
                Go back to npc list
              </button>
            </div>
          )}
        </div>
      )}

      <button
        className={styles.savebutton}
        onClick={isEditing ? updateNPC : handleEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default NPCsView;
