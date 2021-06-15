import React, { useState } from "react";
import Container from "../reusableComponents/Container";
import AppText from "../reusableComponents/AppText";
import Icon from "../reusableComponents/Icon";
import userIcon from "../../Assets/user-icon.png";
import CustomInput from "../reusableComponents/CustomInput";
import addRoom from "../../helpers/addRoom";
import ProfileDropdown from "./ProfileDropdown";
import { useMediaQuery } from "@material-ui/core";
import addIcon from "../../Assets/add-icon.jpg";

const Navbar = ({ changeRoom, user, rooms }) => {
  const [getSearchRes, setGetSearchRes] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const changeDesign = useMediaQuery("(max-width: 1000px)");
  const [searchResults, setSearchRes] = useState([]);

  const search = (txt) => {
    if (txt) {
      setSearchRes(
        rooms.filter((room) =>
          room.name.toUpperCase().includes(txt.toUpperCase())
        )
      );
    } else {
      setSearchRes([]);
    }
  };

  return (
    <Container
      flex
      direction="row"
      position="absolute"
      width="100%"
      height={changeDesign ? "10%" : "7%"}
      alignHorizantle="center"
      alignVertical="center"
      Style={{ backgroundColor: changeDesign ? "#19161d" : "#350d36" }}
    >
      {changeDesign ? (
        <Icon
          source={addIcon}
          width={23}
          height={23}
          padding={5}
          Style={{ position: "absolute", top: "20%", left: 5 }}
          clickEvent={addRoom}
        />
      ) : (
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
      )}
      <CustomInput
        width={changeDesign ? "60%" : "50%"}
        height="30px"
        textinside="Search rooms"
        Style={{
          borderRadius: "5px",
          border: "none",
          backgroundColor: changeDesign ? "#1a1d22" : "#431e44",
          "box-shadow": changeDesign
            ? "inset 0 0 0 1px gray"
            : "inset 0 0 0 1px rgb(104 74 104)",
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
          {searchResults.map((room, idx) => {
            return (
              <Container
                key={idx}
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
        width={changeDesign ? 35 : 40}
        height={changeDesign ? 35 : 40}
        Style={{ position: "absolute", top: changeDesign ? 12 : 5, right: 10 }}
        clickEvent={() => {
          setDropdown((p) => (p ? false : true));
        }}
      />

      {dropdown && <ProfileDropdown user={user} />}
    </Container>
  );
};

export default Navbar;
