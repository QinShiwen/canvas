import { useState,useEffect } from "react";
import styled from "styled-components";
//import { LoginForm } from "./LoginForm";
//import { RegisterForm } from "./RegisterForm";
import { GoogleButton } from "./GoogleButton";
import { gapi } from 'gapi-script';

export interface FormProps {
  setIsLoginForm: (value: boolean) => any;
  setIsLogin: (value: boolean) => void;
}
/*
interface LoginProps {
  setIsLogin: (value: boolean) => void;
}
*/
//{ setIsLogin }: LoginProps
export const Login = () => {
  
  //const [isLoginForm, setIsLoginForm] = useState(true);

  const clientId = "770766831574-8ohhs1ihoag6648547c3ngo60sf6jn6m.apps.googleusercontent.com"

  useEffect(()=>{
    const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
  })

  return (
    <Container>
      <GoogleButton clientId={clientId} />
      {/*
      //setIsLogin = {setIsLogin}
      {isLoginForm ? (
        <FormBox>
          <LoginForm setIsLoginForm={setIsLoginForm} setIsLogin={setIsLogin}/>
        </FormBox>
      ) : (
        <FormBox>
          <RegisterForm setIsLoginForm={setIsLoginForm} setIsLogin={setIsLogin}/>
        </FormBox>
      )}
      */}
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
