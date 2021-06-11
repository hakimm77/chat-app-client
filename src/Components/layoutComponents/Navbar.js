import React, { useState } from "react";
import Container from "../reusableComponents/Container";
import AppText from "../reusableComponents/AppText";
import Icon from "../reusableComponents/Icon";
import userIcon from "../../Assets/user-icon.png";
import CustomInput from "../reusableComponents/CustomInput";
import addRoom from "../../helpers/addRoom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ search, searchResults, changeRoom, user }) => {
  const [getSearchRes, setGetSearchRes] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <Container
      flex
      direction="row"
      position="absolute"
      width="100%"
      height="7%"
      alignHorizantle="center"
      alignVertical="center"
      Style={{ backgroundColor: "#350d36" }}
      mobileStyle={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        position: "absolute",
        backgroundColor: "#350d36",
        alignItems: "center",
      }}
    >
      <Container
        flex
        direction="row"
        position="absolute"
        width="200px"
        height="35px"
        alignHorizantle="center"
        alignVertical="center"
        Style={{ backgroundColor: "#3f0e40", cursor: "pointer", left: 30 }}
        clickEvent={addRoom}
      >
        <AppText color="#fafafa" size={18} weight="bold">
          Create new room
        </AppText>
      </Container>
      <CustomInput
        width="50%"
        height="30px"
        textinside="Search rooms"
        Style={{
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#431e44",
          "box-shadow": "inset 0 0 0 1px rgb(104 74 104)",
          outline: "none",
          color: "#fafafa",
          fontSize: 16,
          marginLeft: 10,
        }}
        onChangetext={(txt) => {
          search(txt.currentTarget.value);
        }}
        focus={() => {
          setGetSearchRes(true);
        }}
        blurInput={() => {
          setTimeout(() => {
            setGetSearchRes(false);
          }, 500);
        }}
      />

      {getSearchRes && (
        <Container
          flex
          direction="column"
          position="absolute"
          width="50%"
          padding="10px"
          Style={{
            maxHeight: "500px",
            overflow: "auto",
            borderRadius: "10px",
            border: "1px solid gray",
            backgroundColor: "white",
            top: "50px",
            "z-index": "10",
          }}
        >
          {searchResults.map((room) => {
            return (
              <Container
                clickEvent={() => {
                  changeRoom(room);
                }}
              >
                <AppText
                  colro="#000"
                  weight="bold"
                  size={20}
                  Style={{ padding: 10, cursor: "pointer" }}
                >
                  {room.name}
                </AppText>
              </Container>
            );
          })}
        </Container>
      )}
      <Icon
        source={userIcon}
        width="40px"
        height="40px"
        Style={{ position: "absolute", top: 5, right: 5 }}
        clickEvent={() => {
          setDropdown((p) => (p ? false : true));
        }}
      />

      {dropdown && <ProfileDropdown user={user} />}
    </Container>
  );
};

export default Navbar;
