import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";

const MainRoomsListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #333;
  background-color: #2c3544;
  width: 30%;
  height: 100%;
  overflow: auto;
`;

const RoomsList = ({ children }) => {
  return <MainRoomsListContainer>{children}</MainRoomsListContainer>;
};

export default RoomsList;
