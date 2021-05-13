import React from "react";
import styled from "styled-components";

const MainRoomsListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75px;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  :hover {
    background-color: #464e5b;
  }
`;

const RoomsListItem = ({ children, changeColor }) => {
  return (
    <MainRoomsListItemContainer onClick={changeColor}>
      {children}
    </MainRoomsListItemContainer>
  );
};

export default RoomsListItem;
