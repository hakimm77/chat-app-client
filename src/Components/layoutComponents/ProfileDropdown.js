import Container from "../reusableComponents/Container";
import AppText from "../reusableComponents/AppText";
import Spacer from "../reusableComponents/Spacer";
import logout from "../../helpers/logout";

const ProfileDropdown = ({ user }) => {
  return (
    <Container
      flex
      direction="column"
      position="absolute"
      width="300px"
      Style={{
        backgroundColor: "#3f0e40",
        top: 50,
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
        Style={{ backgroundColor: "#7e4780", cursor: "pointer" }}
        clickEvent={logout}
      >
        <AppText color="#fafafa" weight="bold" size={20}>
          Log out
        </AppText>
      </Container>
    </Container>
  );
};

export default ProfileDropdown;
