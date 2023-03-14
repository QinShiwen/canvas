import {useEffect,useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { Canvas } from './pages/Paint/Canvas';
import { Login } from './pages/Login/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    //console.log(document.body.clientWidth, document.body.clientHeight)
    console.log(isLogin)
  })
  return (
    <Container>
      {isLogin ? <Canvas w = {800} h = {500}/> : <Login setIsLogin = {setIsLogin}/> }
    </Container>
  );
}

export default App;

const Container = styled.div`
width: 100vw;
height: 100vh;
  background-color: purple;
  overflow: hidden;
`;