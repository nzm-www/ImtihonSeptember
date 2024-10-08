import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
// import bgimg from "../img/registerimg2.webp";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://fn27.vimlc.uz/register", {
        firstName,
        lastName,
        age,
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("userData", JSON.stringify(response.data));

      navigate("/login");
    } catch (error) {
      console.error("Xato:", error);
    }
  };

  return (
    <div className="body">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="box">

        <form className="form" onSubmit={handleSubmit}>
          <div className="dvo">
            <div className="first">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="second">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="formbtndiv">
            <p className="loginlink">
              <Link to="/login">Login</Link>{" "}
            </p>
            <button className="btnform" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
