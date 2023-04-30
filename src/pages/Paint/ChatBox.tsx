import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

export function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <Container>
      <div className="title"><h2>Room Chat</h2></div>
      <div className="view">

      </div>
      <div className="text">
        <textarea></textarea>
        <button>Send</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
  height: 300px;
  background: #ffffff;
  /* Off white */

  border: 2px solid #f2f2f2;
  box-shadow: 0px 4px 30px rgba(74, 74, 74, 0.05);
  border-radius: 25px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 20px;
    color: white;
    margin: 0;
    padding: 0;
  }

  .title {
    flex: 0.15;
    background: #361c60;
    /* Off white */

    border: 2px solid #f2f2f2;
    box-shadow: 0px 4px 30px rgba(74, 74, 74, 0.05);
    border-radius: 25px 25px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .view {
    flex: 0.5;
    background-color: white;
  }

  .text {
    flex: 0.35;
    display: flex;
    flex-direction: column;
  }

  textarea {
    flex: 0.6;
    resize: none;
    height: 50px;
    padding: 5px;
    font-size: 15px;
    background: #f1e9ff;

    outline: none;
    border:none;
  }

  button {
    border-radius:0px 0px 25px 25px;
    flex: 0.4;
    width: 100%;
    height: 30px;
    border: none;
    background: #cdaeff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
