import React from "react";
import styled from "styled-components";
import AppText from "../reusableComponents/AppText";

const MainRoomsListContainer = styled.div`
  position: absolute;
  top: 7%;
  left: 0;
  flex-direction: column;
  background-color: #3f0e40;
  width: 20%;
  height: 100%;
  overflow: auto;

  @media (max-width: 1000px) {
    top: 60px;
    left: 60px;
    width: 200px;
    height: fit-content;
    max-height: 450px;
    border-radius: 4px;
  }
`;

const RoomsList = ({ children, listDisplay }) => {
  return (
    <MainRoomsListContainer style={{ display: listDisplay }}>
      <AppText color="#cfc3cf" size={23} Style={{ padding: 5 }}>
        Rooms
      </AppText>

      {children}
    </MainRoomsListContainer>
  );
};

export default RoomsList;
