import React, { useState } from "react";
import { useInfoContext, } from "../../context/useInfoContext";
import { FormProps } from "./Login";

export const RegisterForm = ({setIsLoginForm}:FormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerPost, ifEmailExist } = useInfoContext();

  const register = async () => {
      if (email === "" || password === "" || name === "") {
        alert("Please fill in the form");
        return;
      }
      //check if the email is valid
      if (!email.includes("@")) {
        alert("Please enter a valid email");
        return;
      }
      //check if the password is valid
      if (password.length < 6) {
        alert("Password's length should be at least 6");
        return;
      }

      //check if the email is already registered
      const emailexsit = await ifEmailExist(email);
      alert(emailexsit);
      if (emailexsit) return false;

  };

  return (
    <>
      <h1>Register</h1>
      <input
        placeholder="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="name"
        name="username"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={register}>Register</button>
      <div style={{ cursor: "pointer" }} onClick={() => setIsLoginForm(true)}>
        Log In
      </div>
    </>
  );
};
