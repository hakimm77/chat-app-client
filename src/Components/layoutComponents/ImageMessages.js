import React from "react";
import Container from "../reusableComponents/Container";
import Icon from "../reusableComponents/Icon";
import AppText from "../reusableComponents/AppText";
import likeIcon from "../../Assets/like-icon.png";
import likeMessage from "../../helpers/likeMessage";
import likeIconFun from "../../Assets/like-icon-function.jpg";

const ImageMessages = ({
  content,
  userEmail,
  rooms,
  selectedRoom,
  changeDesign,
}) => {
  return (
    <Container
      flex
      direction="row"
      position="relative"
      padding="13px"
      margin="2px 2px 2px 7px"
      Style={{ borderRadius: "15px", cursor: "pointer" }}
    >
      <Icon source={content[1].image} width={250} height={150} />
      {content[1].likes ? undefined : (
        <Icon
          source={likeIconFun}
          width={changeDesign ? 20 : 25}
          height={changeDesign ? 20 : 25}
          padding={changeDesign ? 4 : 7}
          Style={{ opacity: 0.4 }}
          clickEvent={() => {
            likeMessage(content[0], rooms[selectedRoom].id, userEmail);
          }}
        />
      )}

      {content[1].likes ? (
        <Container flex direction="row">
          <Icon
            source={likeIcon}
            width={20}
            height={20}
            Style={{
              position: "absolute",
              bottom: -10,
              right: -10,
            }}
          />
          <AppText
            color="gray"
            size={16}
            Style={{
              position: "absolute",
              bottom: -6,
              right: -23,
            }}
          >
            {content[1].likes}
          </AppText>
        </Container>
      ) : undefined}
    </Container>
  );
};

export default ImageMessages;
