import Container from "../reusableComponents/Container";
import AppText from "../reusableComponents/AppText";
import Spacer from "../reusableComponents/Spacer";
import logout from "../../helpers/logout";
import { useMediaQuery } from "@material-ui/core";

const ProfileDropdown = ({ user }) => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  return (
    <Container
      flex
      direction="column"
      position="absolute"
      width="300px"
      Style={{
        backgroundColor: changeDesign ? "#1a221f" : "#3f0e40",
        border: "1px solid white",
        top: 60,
        right: 10,
        "z-index": "10",
        borderRadius: 5,
      }}
    >
      <Container flex height={50} alignHorizantle="center">
        <AppText
          color="white"
          size={20}
          weight="bold"
          Style={{ paddingLeft: 10 }}
        >
          {user.replace("@gmail.com", "")}
        </AppText>
      </Container>
      <Spacer height={3} />

      <Container
        flex
        height={50}
        alignVertical="center"
        alignHorizantle="center"
        Style={{ backgroundColor: "gray", cursor: "pointer" }}
        clickEvent={logout}
      >
        <AppText color="#000" weight="bold" size={20}>
          Log out
        </AppText>
      </Container>
    </Container>
  );
};

export default ProfileDropdown;
