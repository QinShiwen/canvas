import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface UsersBarProps {
  players: string[];
}

export function UsersBar({ players }: UsersBarProps) {
  return (
    <Container>
      <div className="title">Players</div>
      <div className="view">
        {players.map((player,index) => {
          return <div key = {index}>{player}</div>;
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 300px;
  background-color: red;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0.1;
  }

  .view {
    flex: 0.9;
    background-color: white;
  }
`;
