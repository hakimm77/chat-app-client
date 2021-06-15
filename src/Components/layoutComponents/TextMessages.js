import React from "react";
import Container from "../reusableComponents/Container";
import Icon from "../reusableComponents/Icon";
import AppText from "../reusableComponents/AppText";
import likeIcon from "../../Assets/like-icon.png";
import likeMessage from "../../helpers/likeMessage";
import replyIcon from "../../Assets/reply-icon.png";
import likeIconFun from "../../Assets/like-icon-function.jpg";

const TextMessages = ({
  content,
  userEmail,
  rooms,
  selectedRoom,
  setReply,
  changeDesign,
}) => {
  return (
    <Container flex direction="row" alignHorizantle="center">
      <Container
        flex
        direction="row"
        position="relative"
        width="fit-content"
        padding={changeDesign ? 10 : 13}
        margin="5px 5px 5px 7px"
        Style={{
          maxWidth: "65%",
          wordBreak: "break-word",
          borderRadius: "15px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        <AppText
          color="#262626"
          size={20}
          mobileStyle={{ color: "#262626", fontSize: 17 }}
        >
          {content[1].message}
        </AppText>

        {content[1].likes ? (
          <Container flex direction="row">
            <Icon
              source={likeIcon}
              width={25}
              height={25}
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
      {[content[1].userLiked].filter(
        (element) =>
          element[userEmail.replace("@gmail.com", "") + content[0]] ===
          userEmail
      ).length > 0 ? undefined : (
        <Icon
          source={likeIconFun}
          width={25}
          height={25}
          padding={7}
          Style={{ opacity: 0.4 }}
          clickEvent={() => {
            likeMessage(content[0], rooms[selectedRoom].id, userEmail);
          }}
        />
      )}

      <Icon
        source={replyIcon}
        width={changeDesign ? 20 : 25}
        height={changeDesign ? 20 : 25}
        padding={changeDesign ? 4 : 7}
        Style={{ opacity: 0.5 }}
        clickEvent={() => {
          setReply(content[1].message);
        }}
      />
    </Container>
  );
};

export default TextMessages;
