import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";

const MainRoomsListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  border: 3px solid #333;
  background-color: #2c3544;
  width: 30%;
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
  return (
    <MainRoomsListContainer style={{ display: listDisplay }}>
      {children}
    </MainRoomsListContainer>
  );
};

export default RoomsList;
