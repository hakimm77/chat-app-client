import React, { useState, useEffect } from "react";
import AppText from "../Components/reusableComponents/AppText";
import Spacer from "../Components/reusableComponents/Spacer";
import logout from "../helpers/logout";
import Container from "../Components/reusableComponents/Container";
import Icon from "../Components/reusableComponents/Icon";
import userDefault from "../Assets/user-icon.png";
import Navbar from "../Components/layoutComponents/Navbar";

const Profile = ({ history }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const getCurrentUser = async () => {
    document.title = "Chat app | profile";
    console.log(user);
    if (!user) {
      history.push("/login");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Container>
      <Navbar history={history} />
      <Container
        flex
        direction="column"
        height={window.innerHeight + "px"}
        alignVertical="center"
        alignHorizantle="center"
        Style={{
          backgroundColor: "#fafafa",
        }}
      >
        <Container
          flex
          direction="column"
          alignVertical="center"
          alignHorizantle="center"
          width="30%"
          height="500px"
          Style={{
            backgroundColor: "#3F0E40",
            boxShadow: "0 0 10px #ccc",
            borderRadius: "10px",
          }}
          mobileStyle={{
            display: "flex",
            flexDirection: "column",
            width: "95%",
            height: "500px",
            boxShadow: "0 0 10px #ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon source={userDefault} width="120px" height="120px" />
          <Spacer height={2} />
          <AppText size={22} color="#fafafa">
            {user ? user.replace("@gmail.com", "") : "loading..."}
          </AppText>

          <Spacer height={5} />
          <Container
            flex
            width="180px"
            height="50px"
            alignVertical="center"
            alignHorizantle="center"
            padding="7px"
            Style={{
              backgroundColor: "#350d36",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            clickEvent={() => {
              logout(history);
            }}
          >
            <AppText size={30} weight="bold" color="white">
              Logout
            </AppText>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Profile;
