import React,{useRef,useEffect,useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { Canvas } from './pages/Paint/Canvas';
function App() {
  useEffect(() => {
    console.log(document.body.clientWidth, document.body.clientHeight)
  })
  return (
    <Container>
      <Canvas w = {800} h = {500}/>
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