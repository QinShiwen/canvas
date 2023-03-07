import { useRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface LoginForm {
  name: string;
  password: string;
  email: string;
}

interface RegisterForm {
  email: string;
  password: string;
}
export const Login = (setIsLogin: any) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    name: "",
    password: "",
    email: "",
  });

  const [RegisterForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
  });

  const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const registerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...RegisterForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = () => {
    //setIsLogin(true);
  };

  const register = async () => {
    setIsLoginForm(true);
  };

  return (
    <Container>
      {isLoginForm ? (
        <FormBox>
          <h1>Log In</h1>
          <input placeholder="email" name="email" onChange={loginChange} />
          <input
            placeholder="password"
            name="password"
            onChange={loginChange}
          ></input>
          <button onClick={login}>Log In</button>
          <div style={{cursor:"pointer"}} onClick = {()=>setIsLoginForm(false)}>Register</div>
        </FormBox>
      ) : (
        <FormBox>
          <h1>Register</h1>
          <input placeholder="email" name="email" onChange={registerChange} />
          <input placeholder="name" name="username" onChange={registerChange} />
          <input
            placeholder="password"
            name="password"
            onChange={registerChange}
          ></input>
          <button onClick={register}>Register</button>
        </FormBox>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
