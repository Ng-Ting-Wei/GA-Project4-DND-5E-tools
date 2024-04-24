import React, { useState } from "react";
import Login from "./pages/Login";
import Player from "./pages/Player";
import DungeonMaster from "./pages/DungeonMaster";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserContext from "./context/user";
import { Navigate } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userById, setUserById] = useState("");

  return (
    <div>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, userById, setUserById }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="player" element={<Player />}></Route>
          <Route path="dungeonmaster" element={<DungeonMaster />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
