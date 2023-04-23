import { useEffect,useState } from "react";
import styled from "styled-components";
import "./App.css";
import { CanvasUpdate } from "./pages/Paint/CanvasUpdate";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Routes, Route, useNavigate, Router } from "react-router-dom";



function App() {

  return (
    <Container>
      <BrowserRouter>
      <Routes>
        <Route path = "/canvas" element = {<CanvasUpdate  w={800} h={500} />}/>
        {/*<Route path = "/login" element = {<Login />}/>*/}
      </Routes>
      </BrowserRouter>
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
