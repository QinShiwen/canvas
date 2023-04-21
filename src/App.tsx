import { useEffect,useState } from "react";
import styled from "styled-components";
import "./App.css";
import { CanvasUpdate } from "./pages/Paint/CanvasUpdate";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Routes, Route, useNavigate, Router } from "react-router-dom";

import { nanoid } from "nanoid";

function App() {
  //const [isLogin, setIsLogin] = useState(false);
  const [roomId, setRoomId] = useState("");
  const name = nanoid(5);

  useEffect(() => {
    //This is for testing
    //how to get the room id from the url?
    const roomId = window.location.pathname.split("/")[2];
    console.log(roomId);
    if (roomId) {
      setRoomId(roomId);
    }else{
      //setRoomId(nanoid(5));
      //console.log(roomId);
      const auth = {
        name: name,
        roomId: roomId,
      };
      sessionStorage.setItem("user", JSON.stringify(auth));
      //how to let the roomid in the url change?
      window.location.href= `/canvas/${nanoid(5)}`;
    }

  },[roomId]);
  return (
    <Container>
      <BrowserRouter>
      <Routes>
        <Route path = "/canvas/:roomid" element = {<CanvasUpdate  w={800} h={500} />}/>
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
