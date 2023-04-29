import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";


export function ChatBox(){
    const [messages, setMessages] = useState<string[]>([]);
    
    return(
        <Container>
            <div className="title">Room Chat</div>
            <div className="view"></div>
            <div className="text">
                <textarea></textarea>
                <button>Send</button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 300px;
    background-color: red;
    display:flex;
    flex-direction: column;

    .title{
        flex: 0.1;
    }

    .view{
        flex: 0.7;
        background-color: white;
    }

    .text{
        flex: 0.2;
        display: flex;
        flex-direction: column;
    }

    textarea{
        flex: 0.8;
        resize: none;
        height: 50px;
    }
    button{
        flex: 0.2;
        width: 100%;
        height: 100%;
    }

`;