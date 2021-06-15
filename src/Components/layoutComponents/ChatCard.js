import React from "react";
import styled from "styled-components";
import AppText from "../reusableComponents/AppText";
import returnicon from "../../Assets/return-icon.png";
import Icon from "../reusableComponents/Icon";
import { useMediaQuery } from "@material-ui/core";

const MainCardContainer = styled.div`
  position: absolute;
  height: 93%;
  width: 80%;
  top: 50px;
  left: 20%;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  box-shadow: 0 0 5px #ccc;

  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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

const ChatCard = ({ children, roomName, display, returnMenu }) => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  return (
    <MainCardContainer style={{ display: display }}>
      <Upbar>
        {changeDesign && (
          <Icon
            source={returnicon}
            width={30}
            height={30}
            padding={5}
            Style={{ position: "absolute", left: 0, top: "5%" }}
            clickEvent={returnMenu}
          />
        )}
        <AppText
          size={20}
          Style={{
            position: "absolute",
            top: "25%",
            left: changeDesign ? "15%" : 10,
          }}
        >
          {roomName}
        </AppText>
      </Upbar>
      {children}
    </MainCardContainer>
  );
};

export default ChatCard;
