import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { Slider } from "antd";
import { UsersBar } from "./UsersBar";
import { nanoid } from "nanoid";
import { ChatBox } from "./ChatBox";
import useWebsocket from "react-use-websocket";
import { FuncButton } from "./FuncButton";

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
  useWebsocket("ws://localhost:8080", {
    onOpen: () => console.log("opened"),

    onMessage: (event) => {
      console.log("message", event.data);
    },

    onClose: () => console.log("closed"),

    shouldReconnect: (closeEvent) => true,
  });

  const username = nanoid(5);

  //const [socket, setSocket] = useState<Socket>(io('http://localhost:1000'));

  const [players, setPlayers] = useState<string[]>([username]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvas, setCanvas] = useState<HTMLCanvasElement>(canvasRef.current!);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<Point>({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [penSize, setPenSize] = useState(5);

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
    };

    //socket?.emit("message", data);
    //console.log(socket, data);
  }

  function shareLink() {
    //copy the link to the clipboard
    navigator.clipboard.writeText(window.location.href);
  }

  function MouseDown(e: any) {
    setIsDrawing(true);
    setLastPos({
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    });
  }

  function MouseMove(e: any) {
    if (isDrawing) {
      const newPos = {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop,
      };
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

  const functionArray = [clear, download, shareLink];

  const functionNames = ["Clear", "Download", "Share"];

  useEffect(() => {
    setCanvas(canvasRef.current!);
  }, [canvas]);

  return (
    <Container>
      <UsersBar players={players} />
      <ChatBox />
      <ToolBar>
        {functionArray.map((func, index) => {
          return <FuncButton onClick={func} name={functionNames[index]} />;
        })}
        <button onClick={() => setColorPickerVisible(!colorPickerVisible)}>
          <div style={{ backgroundColor: color, width: "100%", height: "100%", borderRadius:"25px" }}></div>
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
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180.96deg, #220942 1.92%, #ffffff 125.8%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  canvas {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 0.297908px rgba(66, 71, 76, 0.32),
      0px 2.38326px 4.76653px rgba(66, 71, 76, 0.05),
      0px 2.38326px 23.8326px #eeeeee;
    border-radius: 48.5944px;
  }
`;

const ToolBar = styled.div`
  background: #55426d;
  /* Off white */

  box-shadow: 0px 4px 30px rgba(74, 74, 74, 0.05);
  border-radius: 0px 0px 25px 25px;
  position: absolute;
  top: 0;
  padding: 10px;

  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    margin: 10px;
    background: #cdaeff;
    box-shadow: 1px 1px 10px #444444;
    border-radius: 10px;
    width: 100px;
    height: 40px;
    background-color: #ffffff;
    border: 2px solid #f2f2f2;
    box-shadow: 0px 4px 30px rgba(74, 74, 74, 0.05);
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
