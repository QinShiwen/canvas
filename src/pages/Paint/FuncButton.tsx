import styled from "styled-components";

interface FuncButtonProps {
  onClick: () => void;
  name: any;
}

export function FuncButton({ onClick, name }: FuncButtonProps) {
  return (
    <Container onClick={onClick}>
      {name}
    </Container>
  );
}

const Container = styled.div`
  background: #cdaeff;
  box-shadow: 1px 1px 10px #444444;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  margin: 10px;
  background-color: #ffffff;
  border: 2px solid #f2f2f2;
  box-shadow: 0px 4px 30px rgba(74, 74, 74, 0.05);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
