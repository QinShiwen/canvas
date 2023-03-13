import React, { useState } from "react";
import { useInfoContext } from "../../context/useInfoContext";
import { FormProps } from "./Login";

export const LoginForm = ({setIsLoginForm}: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginPost } = useInfoContext();

  const login = async () => {
    if (email === "" || password === "") {
      alert("Please fill in the form");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password's length should be at least 6");
      return;
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <input
        placeholder="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login}>Log In</button>
      <div style={{ cursor: "pointer" }} onClick={() => setIsLoginForm(false)}>
        Register
      </div>
    </>
  );
};
