import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import userContext from "../context/user";
import { useInfo } from "../context/info";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Style.module.css";

const Login = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(userContext);
  const { setUserInfo, setUserById, setUserRole } = useInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetchData("/api/users/login", "POST", {
      email,
      password,
    });
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const userData = res.data;
      userCtx.setUserById(userData.data._id);
      userCtx.setUserRole(userData.data.role);

      setUserInfo(res.data.data);
      setUserById(res.data.data);
      setUserRole(res.data.role);
      // redirect to player page after login
      navigate("/player");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <div>
      <h1 className={styles.loginheader}>Welcome to DND 5E tools</h1>

      <div className={styles.login}>
        <br />
        <div>
          <input
            type="email"
            className="col-md-4"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="password"
            className="col-md-4"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className="col-md-4" type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className={styles.loginregisterlink}>
          <Link to="/register">Don't have an Account? Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
