import React from "react";
import styled from "styled-components";
import AppText from "../reusableComponents/AppText";

const MainCardContainer = styled.div`
  position: absolute;
  height: 93%;
  width: 80%;
  top: 50px;
  left: 20%;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  -moz-box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc;

  @media (max-width: 1000px) {
    width: 90%;
    height: 80%;
    top: 20%;
    left: 5%;
  }
`;

const Upbar = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d6d6d6;
  padding-left: 10px;

  @media (max-width: 1000px) {
    width: 95%;
  }
`;

const ChatCard = ({ children, roomName }) => {
  return (
    <MainCardContainer>
      <Upbar>
        <AppText size={20} Style={{ position: "absolute", top: "25%" }}>
          {roomName}
        </AppText>
      </Upbar>
      {children}
    </MainCardContainer>
  );
};

export default ChatCard;
