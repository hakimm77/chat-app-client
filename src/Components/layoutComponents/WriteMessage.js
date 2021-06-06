import React from "react";
import styled from "styled-components";
import Container from "../reusableComponents/Container";
import Picker from "emoji-picker-react";
import Icon from "../reusableComponents/Icon";
import emojiIcon from "../../Assets/emojiIcon.png";
import AppText from "../reusableComponents/AppText";
import sendMessageIcon from "../../Assets/send-message-icon.png";

const MessageInput = styled.input`
  width: 95%;
  border-radius: 15px;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 17px;
  color: #383838;
  ::placeholder {
    font-size: 16px;
  }
`;

const WriteMessage = ({
  displayEmojiPicker,
  roomsArray,
  selectedRoom,
  setDisplayEmojiPicker,
  sendMessage,
  setMessageContent,
  setReply,
  reply,
  user,
  msg,
}) => {
  return (
    <Container>
      {reply ? (
        <AppText color="#333" Style={{ paddingLeft: 20 }}>{`replying to: ${
          reply.length > 25 ? reply.substr(0, 25) + "...." : reply
        }`}</AppText>
      ) : undefined}
      <Picker
        onEmojiClick={(event, emojiObject) => {
          setMessageContent((previousContent) =>
            previousContent
              ? previousContent.concat(emojiObject.emoji)
              : emojiObject.emoji
          );
        }}
        pickerStyle={{
          display: displayEmojiPicker,
          position: "fixed",
          bottom: 60,
          right: 20,
          border: "1px solid black",
        }}
        groupVisibility={{
          flags: false,
          food_drink: false,
          travel_places: false,
          symbols: false,
          recently_used: false,
        }}
        native
      />

      <Container
        flex
        direction="row"
        width="100%"
        alignVertical="center"
        alignHorizantle="center"
      >
        <Container
          flex
          direction="row"
          width="97%"
          alignVertical="center"
          alignHorizantle="center"
          Style={{
            border: "1px solid #a8a8a8",
            overflow: "none",
            marginBottom: 10,
          }}
        >
          <MessageInput
            id="input"
            placeholder={
              roomsArray[selectedRoom]
                ? `Message - ${roomsArray[selectedRoom].name}`
                : undefined
            }
            onChange={(txt) => setMessageContent(txt.currentTarget.value)}
            value={msg}
            autoFocus={true}
            onFocus={() => {
              ("none");
            }}
          />
          <Icon
            source={emojiIcon}
            width="20px"
            height="20px"
            padding="5px"
            clickEvent={() => {
              setDisplayEmojiPicker((previousState) =>
                previousState === "none" ? "" : "none"
              );
            }}
          />
          <Icon
            source={sendMessageIcon}
            width="25px"
            height="25px"
            padding="5px"
            clickEvent={() => {
              sendMessage(msg, reply, user, roomsArray[selectedRoom].id);
              setMessageContent("");
              setReply("");
            }}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default WriteMessage;
