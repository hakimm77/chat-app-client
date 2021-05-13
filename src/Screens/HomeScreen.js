import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.h1`
  color: white;
  padding: 25px;
`;

const ChangeRouteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4ed;
  color: #333;
  font-size: 20px;
  height: 50px;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
`;

const HomeScreen = ({ history }) => {
  return (
    <MainContainer>
      <MainTitle>Chat App v2</MainTitle>
      <ChangeRouteButton
        onClick={() => {
          history.push("/chat");
        }}
      >
        Chatting
      </ChangeRouteButton>
    </MainContainer>
  );
};

export default HomeScreen;
