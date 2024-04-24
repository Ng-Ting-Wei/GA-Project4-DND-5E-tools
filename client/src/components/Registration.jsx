import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Registration = () => {
  const fetchData = useFetch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");

  const getRoles = async () => {
    const res = await fetchData("/api/roles");
    if (res.ok) {
      setRoles(res.data);
    } else {
      console.log(res.data);
    }
  };

  const registerUser = async () => {
    const res = await fetchData("/api/users/register", "PUT", {
      email,
      username,
      password,
      role,
    });

    if (res.ok) {
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("");
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <br />
      <div>
        <input
          className="col-md-4"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="col-md-4"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="col-md-4"
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <select
          name="roles"
          id="roles"
          className="col-md-4"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="none">please select</option>
          {roles.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <button className="col-md-4" type="submit" onClick={registerUser}>
        Register
      </button>
      <div>
        <Link to="/login">Already have an account?</Link>
      </div>
    </>
  );
};

export default Registration;
