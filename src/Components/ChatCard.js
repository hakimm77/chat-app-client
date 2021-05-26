import React, { useState } from "react";
import styled from "styled-components";
import AppText from "./reusableComponents/AppText";
import minimizeIcon from "../Assets/minimize-room.png";
import maximizeIcon from "../Assets/maximize-room.png";

const MainCardContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  -moz-box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc;
  width: 25%;
  height: 500px;

  @media (max-width: 1000px) {
    height: 550px;
    width: 95%;
    right: 2%;
  }
`;

const Upbar = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  border-bottom: 1px solid black;
  border-top: 3px solid #ccc;
  padding-left: 10px;

  @media (max-width: 1000px) {
    width: 95%;
  }
`;

const Icon = styled.img`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 0;
  top: 20%;
  padding-right: 20px;
  cursor: pointer;
`;

const ChatCard = ({ children, roomName }) => {
  const [roomDisplay, setRoomDisplay] = useState(true);

  return (
    <MainCardContainer style={roomDisplay ? undefined : { height: "60px" }}>
      <Upbar>
        <AppText size={25} Style={{ position: "absolute", top: "25%" }}>
          {roomName}
        </AppText>

        <Icon
          src={roomDisplay ? minimizeIcon : maximizeIcon}
          onClick={() => {
            setRoomDisplay((previousState) => (previousState ? false : true));
          }}
        />
      </Upbar>
      {roomDisplay ? children : undefined}
    </MainCardContainer>
  );
};

export default ChatCard;
