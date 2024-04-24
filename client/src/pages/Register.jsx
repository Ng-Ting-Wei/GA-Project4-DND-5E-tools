import React, { useState } from "react";
import UserContext from "../context/user";

const Register = () => {
  const [accessToken, setAccessToken] = useState("");
  return (
    <div>
      <UserContext.Provider
        value={{ accessToken, setAccessToken }}
      ></UserContext.Provider>
    </div>
  );
};

export default Register;
