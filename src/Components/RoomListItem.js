import React from "react";
import styled from "styled-components";

const MainRoomsListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  :hover {
    background-color: #350d36;
  }

  @media (max-width: 1000px) {
    height: 75px;
    padding-right: 7px;
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
