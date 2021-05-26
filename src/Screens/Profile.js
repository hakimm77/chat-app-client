import React, { useState, useEffect } from "react";
import AppText from "../Components/reusableComponents/AppText";
import Spacer from "../Components/reusableComponents/Spacer";
import logout from "../helpers/logout";
import Container from "../Components/reusableComponents/Container";

const Profile = ({ history }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const getCurrentUser = async () => {
    if (!user) {
      history.push("/login");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Container
      flex
      direction="column"
      Style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Spacer height={20} />
      <AppText size={25} color="#09122b">
        {user ? user : "loading..."}
      </AppText>

      <Spacer height={5} />
      <Container
        flex
        width="200px"
        height="50px"
        Style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "7px",
          backgroundColor: "#333",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        clickEvent={() => {
          logout(history);
        }}
      >
        <AppText size={25} color="white">
          Logout
        </AppText>
      </Container>
    </Container>
  );
};

export default Profile;
