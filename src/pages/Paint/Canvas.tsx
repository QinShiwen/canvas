import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { Slider } from "antd";
import {io, Socket} from 'socket.io-client';

interface CanvasProps {
  w: number;
  h: number;
}

export const Canvas = ({ w, h }: CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [penSize, setPenSize] = useState(5);
  const socketRef = useRef<Socket>();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas?.getContext("2d");
      ctx?.beginPath();
      //console.log(canvas?.offsetTop, canvas?.offsetLeft);
      ctx?.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      setIsDrawing(true);
    }
  };

  const finishDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.closePath();
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = penSize;
      }
      ctx?.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      //console.log(e.pageX-canvas.offsetTop, e.pageY-canvas.offsetLeft)
      ctx?.stroke();
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, w, h);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const Resize = (multiple: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.width * multiple;
        canvas.height = canvas.height * multiple;
        ctx.putImageData(imageData, 0, 0);
      }
    }
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");
    //connect the websocket
    socketRef.current.on("connect",()=>{
      console.log("connected");
    })
    socketRef.current.on("drawing",(data)=>{
      //console.log(data);
      
    })
  }, []);

  return (
    <Container>
      <ToolBar>
        <button onClick={clear}>Clear</button>
        <button onClick={download}>Download</button>
        <button onClick={() => setColorPickerVisible(!colorPickerVisible)}>
          <div style={{ backgroundColor: color, width: 25, height: 25 }}></div>
        </button>
        <div style={{ display: colorPickerVisible ? "block" : "none" }}>
          <SketchPicker
            color={color}
            onChange={(newColor) => setColor(newColor.hex)}
          />
        </div>
        <div className="pen-slide-box" style = {{padding:0}}>
          <button onClick={() => Resize(0.8)}>-</button>
            canvas size
          <button onClick={() => Resize(1.2)}>+</button>
        </div>
        <div className="pen-slide-box">
          Pen Size
          <Slider
            max={10}
            min={0}
            defaultValue={5}
            onChange={(v) => setPenSize(v)}
          />
        </div>
        <button>Share</button>
      </ToolBar>
      <canvas
        ref={canvasRef}
        width={w}
        height={h}
        onMouseDown={(e) => startDrawing(e)}
        onMouseUp={(e) => finishDrawing(e)}
        onMouseMove={(e) => draw(e)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  canvas {
    background-color: white;
    border-radius: 5px;
  }
`;

const ToolBar = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    margin: 10px;
    height: 30px;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    outline: none;
    border: none;
  }
  .sketch-picker {
    position: absolute;
    z-index: 100;
  }
  .pen-slide-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: white;
    padding: 0 10px;
    border-radius: 5px;
    margin: 10px;
    button{
      background-color: purple;
      color: white;
      height: 20px;
      width: 20px;
    }
  }
  .ant-slider {
    width: 100px;
  }
`;
