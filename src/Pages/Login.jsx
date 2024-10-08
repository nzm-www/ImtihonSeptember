import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fn27.vimlc.uz/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      navigate("/");
    } catch (error) {
      setError("Loginda hatolik mavjud qaytadan urinib kersez yaxshi boladi domla");
    }
  };

  return (
    <div className="body">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Link to="/register">
        <h2 className="loginh2">Register</h2>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="formogin" onSubmit={handleLogin}>
        <div>
          <label className="inputlabale">
            <HiOutlineMail />

            <input
              className="logininput"
              placeholder="@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="inputlabale">
            <RiLockPasswordLine />

            <input
              placeholder="Password"
              className="logininput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "85px",
          }}
        >
          <div className="iconss">
            <FcGoogle />
            <FaInstagram />
            <FaTelegramPlane />
            <FaGithub />
          </div>
          <button className="btnform" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
