import { useState } from "react";
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

interface LoginProps {
  setIsLogin:(value: boolean) => void
}

export const Login = ({setIsLogin}:LoginProps) => {
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

  const login =  async () => {
    if(loginForm.email === "" || loginForm.password === ""){
      alert("Please fill in the form")
      return;
    }
    //check if the email is valid
    if(!loginForm.email.includes("@")){
      alert("Please enter a valid email")
      return;
    }
    //check if the password is valid
    if(loginForm.password.length < 6){
      alert("Password's length should be at least 6")
      return;
    }

      
    setIsLogin(true);
  };

  const register = async () => {
    if(RegisterForm.email === "" || RegisterForm.password === ""){
      alert("Please fill in the form")
      return;
    }
    //check if the email is valid
    if(!RegisterForm.email.includes("@")){
      alert("Please enter a valid email")
      return;
    }
    //check if the password is valid
    if(RegisterForm.password.length < 6){
      alert("Password's length should be at least 6")
      return;
    }
    //check if the email is already registered




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
            type = "password"
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
            type = "password"
            name="password"
            onChange={registerChange}
          ></input>
          <button onClick={register}>Register</button>
          <div style={{cursor:"pointer"}} onClick = {()=>setIsLoginForm(true)}>Log In</div>
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

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
