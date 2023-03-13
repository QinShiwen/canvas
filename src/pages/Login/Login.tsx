import { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export interface FormProps {
  setIsLoginForm: (value: boolean) => any;
  setIsLogin: (value: boolean) => void;
}

interface LoginProps {
  setIsLogin: (value: boolean) => void;
}

export const Login = ({ setIsLogin }: LoginProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <Container>
      {isLoginForm ? (
        <FormBox>
          <LoginForm setIsLoginForm={setIsLoginForm} setIsLogin={setIsLogin}/>
        </FormBox>
      ) : (
        <FormBox>
          <RegisterForm setIsLoginForm={setIsLoginForm} setIsLogin={setIsLogin}/>
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
