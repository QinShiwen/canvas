import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
//import "react-color";
//import { SketchPicker } from 'react-color';

interface CanvasProps {
  w: number;
  h: number;
}

export const Canvas = ({ w, h }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
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
    const ctx = canvas?.getContext("2d");
    ctx?.lineTo(e.clientX, e.clientY);
    ctx?.stroke();
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  }, []);

  return (
    <Container>
      <canvas
        ref={canvasRef}
        width={w}
        height={h}
        onMouseDown={(e) => startDrawing(e)}
        onMouseUp={(e) => finishDrawing(e)}
        onMouseMove={(e) => draw(e)}
      />
      <ToolBar>
        <button onClick={clear}>Clear</button>
        <button onClick={download}>Download</button>
        {/*<SketchPicker/>*/}
      </ToolBar>
    </Container>
  );
};

const Container = styled.div`
  canvas {
    background-color: white;
  }
`;

const ToolBar = styled.div``;
