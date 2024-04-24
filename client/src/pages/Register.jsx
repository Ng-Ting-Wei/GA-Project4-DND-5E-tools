import React, { useState } from "react";
import UserContext from "../context/user";
import RegisterUser from "../components/Registration";

const Register = () => {
  const [accessToken, setAccessToken] = useState("");
  return (
    <div>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <RegisterUser></RegisterUser>
      </UserContext.Provider>
    </div>
  );
};

export default Register;
