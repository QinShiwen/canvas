import WebSocket from "ws";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { Slider } from "antd";

interface CanvasProps {
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

export function CanvasUpdate({ w, h }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(canvasRef.current!);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isMultiMood, setIsMultiMood] = useState(false);
  const [lastPos, setLastPos] = useState<Point>({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [penSize, setPenSize] = useState(5);
  const [ws, setWs] = useState<any>(null);
  //const [line,setLine] = useState<Line>({start:{x:0,y:0},end:{x:0,y:0}});
  //const [lines, setLines] = useState<Line[]>([]);

  function drawLine(line: Line) {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
      }
    }
  }

  //tell the server to draw the line
  function sendLine(line: Line) {
    const data = {
      type: "draw",
      line: line,
    }
    ws.onopen = () => {
      ws.send(JSON.stringify(data));
    };
  }

  function shareLink(){
    setIsMultiMood(true);
    //copy the link to the clipboard
    navigator.clipboard.writeText(window.location.href);

  }

  function MouseDown(e: any) {
    setIsDrawing(true);
    setLastPos({ x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop });
  }

  function MouseMove(e: any) {
    if (isDrawing) {
      const newPos = { x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop };
      const line = { start: lastPos, end: newPos };
      setLastPos(newPos);
      drawLine(line);
      sendLine(line);
    }
  }

  function MouseUp(e: any) {
    setIsDrawing(false);
  }

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

  useEffect(() => {
    if (isMultiMood) {
      const ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => {
        console.log("connected");
      };
      ws.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        if(data.type === "draw"){
          drawLine(data.line);
        }
      };
      setWs(ws);
    }
  });

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
        <div className="pen-slide-box">
          Pen Size
          <Slider
            max={10}
            min={0}
            defaultValue={5}
            onChange={(v) => setPenSize(v)}
          />
        </div>
        <button onClick={shareLink}>Share</button>
      </ToolBar>
      <canvas
        ref={canvasRef}
        width={w}
        height={h}
        onMouseDown={(e) => MouseDown(e)}
        onMouseUp={(e) => MouseUp(e)}
        onMouseMove={(e) => MouseMove(e)}
      />
    </Container>
  );
}

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
    button {
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
