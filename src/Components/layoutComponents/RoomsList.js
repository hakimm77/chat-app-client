import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";
import AppText from "../reusableComponents/AppText";
import Container from "../reusableComponents/Container";
import Icon from "../reusableComponents/Icon";
import addIcon from "../../Assets/add-icon.jpg";
import addRoom from "../../helpers/addRoom";

const MainRoomsListContainer = styled.div`
  position: absolute;
  top: 7%;
  left: 0;
  flex-direction: column;
  background-color: #3f0e40;
  width: 20%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

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
  const [displayRooms, setDisplayRooms] = useState(true);
  return (
    <MainRoomsListContainer style={{ display: listDisplay }}>
      <Container
        flex
        direction="row"
        Style={{
          paddingLeft: 10,
          paddingTop: 10,
          cursor: "pointer",
        }}
        clickEvent={() => {
          setDisplayRooms((previous) => (previous ? false : true));
        }}
      >
        <AppText color="#cfc3cf" size={23}>
          Rooms
        </AppText>
      </Container>
      <Icon
        source={addIcon}
        width={17}
        height={17}
        padding={7}
        Style={{ position: "absolute", top: "5px", right: "5px" }}
        clickEvent={addRoom}
      />
      {displayRooms ? children : undefined}
    </MainRoomsListContainer>
  );
};

export default RoomsList;
