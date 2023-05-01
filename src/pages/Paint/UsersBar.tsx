import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface UsersBarProps {
  players: Players[];
}

interface Players {
  name: string;
}

export function UsersBar({ players }: UsersBarProps) {
  return (
    <Container>
      <div className="title">
        <h2>Players</h2>
      </div>
      <div className="view">
        {players.map((player, index) => {
          return ( 
            <div className = "player" key={index}>
              {player.name}
            </div>
          );
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
  background: #ffffff;
  /* Off white */

  border: 1px solid #f2f2f2;
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
    border-radius: 25px;
    flex: 0.85;
    background-color: white;

    display: flex;
    flex-direction: column;
    
    .player {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #361c60;
    }
  }
`;
