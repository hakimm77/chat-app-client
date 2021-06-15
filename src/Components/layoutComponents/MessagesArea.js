import React from "react";
import Container from "../reusableComponents/Container";
import AppText from "../reusableComponents/AppText";
import Spacer from "../reusableComponents/Spacer";
import { useMediaQuery } from "@material-ui/core";
import TextMessages from "./TextMessages";
import ImageMessages from "./ImageMessages";

const MessagesArea = ({
  messagesList,
  rooms,
  selectedRoom,
  userEmail,
  setReply,
}) => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  return (
    <Container
      flex
      direction="column-reverse"
      width="100%"
      margin="60px 0px 0px 0px"
      padding="0px 0px 20px 0px"
      Style={{ overflow: "auto" }}
    >
      {messagesList.map((content, idx) => {
        return (
          <Container
            key={idx}
            position="relative"
            margin={
              messagesList[messagesList.length - 1] === content
                ? "100px 0px 0px 0px"
                : ""
            }
          >
            {messagesList[messagesList.indexOf(content) + 1] &&
            messagesList[messagesList.indexOf(content) + 1][1].email ===
              content[1].email ? (
              messagesList.indexOf(content) === messagesList.length - 1 && (
                <AppText
                  color="black"
                  size={22}
                  Style={{ marginLeft: "15px", marginTop: "10px" }}
                >
                  {content[1].email.replace("@gmail.com", "")}
                </AppText>
              )
            ) : (
              <AppText
                color="black"
                size={changeDesign ? 20 : 22}
                Style={{ marginLeft: "15px", marginTop: "10px" }}
              >
                {content[1].email.replace("@gmail.com", "")}
              </AppText>
            )}
            <Container flex direction="row" alignHorizantle="center">
              <Spacer height={0.5} />
              {content[1].message ? (
                <TextMessages
                  content={content}
                  userEmail={userEmail}
                  rooms={rooms}
                  selectedRoom={selectedRoom}
                  setReply={setReply}
                  changeDesign={changeDesign}
                />
              ) : (
                <ImageMessages
                  content={content}
                  userEmail={userEmail}
                  rooms={rooms}
                  selectedRoom={selectedRoom}
                  changeDesign={changeDesign}
                />
              )}

              {content[1].repliedTo && (
                <AppText
                  color="#262626"
                  size={changeDesign ? 17 : 20}
                  Style={{
                    opacity: 0.6,
                  }}
                >
                  {`replied to :  ${
                    content[1].repliedTo.length > 20
                      ? content[1].repliedTo.substr(0, 20) + "...."
                      : content[1].repliedTo
                  }`}
                </AppText>
              )}
            </Container>
          </Container>
        );
      })}
    </Container>
  );
};

export default MessagesArea;
