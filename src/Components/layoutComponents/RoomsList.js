import React from "react";
import styled from "styled-components";
import AppText from "../reusableComponents/AppText";

const MainRoomsListContainer = styled.div`
  position: absolute;
  top: 7%;
  flex-direction: column;
  background-color: #3f0e40;
  width: 20%;
  height: 100%;
  overflow: auto;

  @media (max-width: 1000px) {
    background-color: #1a1d22;
    top: 60px;
    width: 100%;
    overflow: hidden;
  }
`;

const RoomsList = ({ children, listDisplay }) => {
  return (
    <MainRoomsListContainer style={{ display: listDisplay }}>
      <AppText
        color="#cfc3cf"
        size={23}
        Style={{ padding: 5 }}
        mobileStyle={{ color: "#fafafa", fontSize: 25, padding: 7 }}
      >
        Rooms
      </AppText>

      {children}
    </MainRoomsListContainer>
  );
};

export default RoomsList;
