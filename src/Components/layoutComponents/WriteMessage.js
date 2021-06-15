import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Container from "../reusableComponents/Container";
import Picker from "emoji-picker-react";
import Icon from "../reusableComponents/Icon";
import emojiIcon from "../../Assets/emojiIcon.png";
import AppText from "../reusableComponents/AppText";
import sendMessageIcon from "../../Assets/send-message-icon.png";
import galleryicon from "../../Assets/gallery-icon.png";
import sendImageMessage from "../../helpers/sendImageMessage";

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

const MessageInputForm = styled.form`
  width: 100%;
`;

const WriteMessage = ({
  roomsArray,
  selectedRoom,
  sendMessage,
  setReply,
  reply,
  user,
}) => {
  const fileRef = useRef();
  const [messageContent, setMessageContent] = useState();
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState("none");
  const [sendImage, setSendImage] = useState();

  const saveImageToSend = (img) => {
    var reader = new FileReader();
    reader.onload = () => {
      setSendImage(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const openImagePicker = () => {
    fileRef.current.click();
  };

  const sendTextMessage = (event) => {
    if (event) {
      event.preventDefault();
    }
    sendMessage(messageContent, reply, user, roomsArray[selectedRoom].id);
    setDisplayEmojiPicker("none");
    setMessageContent("");
    setReply("");
  };

  useEffect(() => {
    sendImageMessage(sendImage, user, roomsArray[selectedRoom], reply);
    setSendImage("");
  }, [sendImage]);

  return (
    <Container>
      {reply && (
        <AppText color="#333" Style={{ paddingLeft: 20 }}>{`replying to: ${
          reply.length > 25 ? reply.substr(0, 25) + "...." : reply
        }`}</AppText>
      )}

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
          margin="0px 0px 10px 0px"
          Style={{ border: "1px solid #a8a8a8", overflow: "none" }}
        >
          <MessageInputForm
            onSubmit={(event) => {
              sendTextMessage(event);
            }}
          >
            <MessageInput
              id="input"
              type="text"
              placeholder={
                roomsArray[selectedRoom] &&
                `Message - ${roomsArray[selectedRoom].name}`
              }
              onChange={(txt) => setMessageContent(txt.currentTarget.value)}
              value={messageContent}
              autoFocus={true}
            />
          </MessageInputForm>
          <Icon
            source={galleryicon}
            width="30px"
            height="23px"
            padding="5px"
            clickEvent={openImagePicker}
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
            clickEvent={sendTextMessage}
          />
        </Container>
      </Container>
      <input
        style={{ display: "none" }}
        type="file"
        ref={(file) => (fileRef.current = file)}
        onChange={(e) => {
          saveImageToSend(e.target.files[0]);
        }}
      />
      <Picker
        onEmojiClick={(event, emojiObject) => {
          setMessageContent((previousContent) =>
            previousContent
              ? previousContent.concat(emojiObject.emoji)
              : emojiObject.emoji
          );
        }}
        pickerStyle={{
          backgroundColor: "white",
          width: "100%",
          display: displayEmojiPicker,
          border: "1px solid black",
        }}
        groupVisibility={{
          animals_nature: false,
          food_drink: false,
          travel_places: false,
          activities: false,
          objects: false,
          symbols: false,
          flags: false,
          recently_used: false,
        }}
        native
        disableSearchBar
      />
    </Container>
  );
};

export default WriteMessage;
