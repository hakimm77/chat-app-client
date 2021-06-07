import React from "react";
import Container from "../reusableComponents/Container";
import Icon from "../reusableComponents/Icon";
import AppText from "../reusableComponents/AppText";
import Spacer from "../reusableComponents/Spacer";
import likeIcon from "../../Assets/like-icon.png";
import likeMessage from "../../helpers/likeMessage";
import replyIcon from "../../Assets/reply-icon.png";

const MessagesArea = ({
  messagesList,
  rooms,
  selectedRoom,
  userEmail,
  setReply,
}) => {
  return (
    <Container
      flex
      direction="column-reverse"
      width="100%"
      Style={{
        overflow: "auto",
        paddingBottom: "20px",
        marginTop: "60px",
      }}
    >
      {messagesList.map((content) => {
        return (
          <Container
            Style={
              messagesList[messagesList.length - 1] === content
                ? { position: "relative", marginTop: 100 + "px" }
                : { position: "relative" }
            }
          >
            {messagesList[messagesList.indexOf(content) + 1] &&
            messagesList[messagesList.indexOf(content) + 1][1].email ===
              content[1].email ? (
              messagesList.indexOf(content) === messagesList.length - 1 ? (
                <AppText
                  color="black"
                  size={22}
                  Style={{ marginLeft: "15px", marginTop: "10px" }}
                >
                  {content[1].email.replace("@gmail.com", "")}
                </AppText>
              ) : undefined
            ) : (
              <AppText
                color="black"
                size={22}
                Style={{ marginLeft: "15px", marginTop: "10px" }}
              >
                {content[1].email.replace("@gmail.com", "")}
              </AppText>
            )}
            <Container flex direction="row" alignHorizantle="center">
              <Spacer height={0.5} />

              <Container
                flex
                direction="row"
                width="fit-content"
                doubleClick={() => {
                  likeMessage(content[0], rooms[selectedRoom].id, userEmail);
                }}
                Style={{
                  position: "relative",
                  maxWidth: "65%",
                  wordBreak: "break-word",
                  borderRadius: "15px",
                  backgroundColor: "#fafafa",
                  border: "1px solid #ccc",
                  margin: "2px",
                  padding: "13px",
                  marginLeft: "7px",
                  cursor: "pointer",
                }}
              >
                <AppText color="#262626" size={20}>
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
              <Icon
                source={replyIcon}
                width={25}
                height={25}
                padding={7}
                Style={{ opacity: 0.5 }}
                clickEvent={() => {
                  setReply(content[1].message);
                }}
              />

              {content[1].repliedTo ? (
                <AppText
                  color="#262626"
                  size={20}
                  Style={{
                    opacity: 0.6,
                  }}
                >
                  {`replied to :  ${
                    content[1].repliedTo.length > 25
                      ? content[1].repliedTo.substr(0, 25) + "...."
                      : content[1].repliedTo
                  }`}
                </AppText>
              ) : undefined}
            </Container>
          </Container>
        );
      })}
    </Container>
  );
};

export default MessagesArea;
