
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface UsersBarProps {

}

export function UsersBar(){
    return (
        <Container>
            <div>Players</div>
            <div>
                <div>user1</div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 200px;
    height: 300px;
    background-color: red;
    display:flex;
    flex-dir
`;