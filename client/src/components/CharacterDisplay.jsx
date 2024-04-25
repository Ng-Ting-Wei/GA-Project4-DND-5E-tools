import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useInfo } from "../context/info";
import CharacterModal from "./CharacterModal";

const CharacterDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const userId = userCtx.userById;
  const [characters, setCharacters] = useState([]);
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const getCharacters = async () => {
    const res = await fetchData(
      "/api/characters/player",
      "POST",
      {
        player: userId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setCharacters(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const createCharacter = async () => {
    const res = await fetchData(
      "/api/characters",
      "PUT",
      {
        name: "Greg",
        race: "human",
        class: "fighter",
        background: "noble",
        savingthrows: ["strength", "constitution"],
        skill: ["athletics", "perception", "persuasion", "history"],
        strength: 14,
        dexterity: 14,
        constitution: 14,
        intelligence: 10,
        wisdom: 13,
        charisma: 12,
        hitpoints: 12,
        armorclass: 16,
        inventory: ["longsword", "bow", "20 Arrows", "Chain mail"],
        player: "6625e8c74da19164738ae814",
      },
      userCtx.accessToken
    );
  };

  const handleTest = () => {
    console.log(characters);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">Characters</div>
      </div>
      <button onClick={createCharacter}>Create Character</button>

      {showCharacterModal && (
        <CharacterModal
          setShowCharacterModal={setShowCharacterModal}
        ></CharacterModal>
      )}

      {characters.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <div>
            <span>Name: {item.name}</span>
            <span style={{ marginLeft: "10px" }}>Race: {item.race}</span>
            <span style={{ marginLeft: "10px" }}>Class: {item.class}</span>
            <span style={{ marginLeft: "10px" }}>Level: {item.level}</span>
            <span style={{ marginLeft: "10px" }}>
              {/* // Convert to local time in a readable format */}
              Date Created: {new Date(item.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterDisplay;
