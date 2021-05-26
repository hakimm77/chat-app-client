import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AppText from "../Components/reusableComponents/AppText";
import ChatCard from "../Components/ChatCard";
import RoomsList from "../Components/RoomsList";
import sendMessage from "../helpers/sendMessage";
import RoomsListItem from "../Components/RoomListItem";
import addRoom from "../helpers/addRoom";
import sendMessageIcon from "../Assets/send-message-icon.png";
import menuToggle from "../Assets/menu-toggle.png";
import Container from "../Components/reusableComponents/Container";
import Spacer from "../Components/reusableComponents/Spacer";
import Picker from "emoji-picker-react";
import emojiIcon from "../Assets/emojiIcon.png";
import userIcon from "../Assets/user-icon.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Icon from "../Components/reusableComponents/Icon";

const MessageInput = styled.input`
  width: 95%;
  border-radius: 15px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: #e0e0e0;
  font-size: 17px;
  color: #383838;
`;

const Chat = ({ history }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [messageContent, setMessageContent] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState("none");
  const [roomDisplay, setRoomDisplay] = useState("none");
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  const loggedIn = async () => {
    console.log(user);
    if (user) {
      setIsLogged(true);
      setUserEmail(user);
    } else {
      history.push("./login");
    }
  };

  const fetchMessages = async () => {
    if (rooms[selectedRoom]) {
      const fetchMessagesResponse = fetch(
        `https://us-central1-backend-a365f.cloudfunctions.net/app/get?roomID=${rooms[selectedRoom].id}`
      ).then((response) => {
        return response.json();
      });

      await fetchMessagesResponse.then((data) => {
        if (data) {
          let messagesArr = Object.values(data);

          setMessagesList([]);

          messagesArr.forEach((childSnapchot) => {
            setMessagesList((previousMessages) => [
              childSnapchot,
              ...previousMessages,
            ]);
          });
        }
      });
    }
  };

  const getRooms = async () => {
    const fetchRooms = fetch(
      `https://us-central1-backend-a365f.cloudfunctions.net/app/getRooms`
    ).then((response) => {
      return response.json();
    });

    await fetchRooms.then((data) => {
      if (data) {
        let roomsArr = Object.values(data);

        setRooms([]);

        roomsArr.forEach((childSnapchot) => {
          setRooms((previousMessages) => [...previousMessages, childSnapchot]);
        });
      }
    });
  };

  const changeRoom = (room) => {
    setMessagesList([]);
    setSelectedRoom(rooms.indexOf(room));
    setMessageContent("");
  };

  useEffect(() => {
    loggedIn();
    getRooms();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [rooms.length, selectedRoom, messageContent]);

  onkeydown = (e) => {
    if (isLogged) {
      if (e.keyCode === 13) {
        setMessageContent("");
        sendMessage(messageContent, userEmail, rooms[selectedRoom].id);
      }
    }
  };

  return (
    <Container
      flex
      direction="row"
      height="100%"
      Style={
        rooms.length
          ? { justifyContent: "space-between" }
          : {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      {isLogged ? (
        <Container>
          <Container
            clickEvent={() => {
              history.push("./profile");
            }}
          >
            <Icon
              source={userIcon}
              width="55px"
              height="55px"
              padding="5px"
              Style={{ position: "absolute", top: 0, right: 0 }}
            />
          </Container>

          <Icon
            width="55px"
            height="55px"
            padding="5px"
            source={menuToggle}
            clickEvent={() => {
              setRoomDisplay((previous) =>
                previous === "flex" ? "none" : "flex"
              );
            }}
          />

          {rooms.length ? (
            <ChatCard
              roomName={
                rooms[selectedRoom] ? rooms[selectedRoom].name : "Loading..."
              }
            >
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
                  position: "absolute",
                  top: 50,
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
                Style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: "2px solid #bdbdbd",
                  overflow: "none",
                  padding: "7px",
                }}
              >
                <Icon
                  source={emojiIcon}
                  width="25px"
                  height="25px"
                  padding="7px"
                  clickEvent={() => {
                    setDisplayEmojiPicker((previousState) =>
                      previousState === "none" ? "" : "none"
                    );
                  }}
                />
                <MessageInput
                  id="input"
                  placeholder="Type a message..."
                  onChange={(txt) => setMessageContent(txt.currentTarget.value)}
                  value={messageContent}
                  autoFocus={true}
                  onFocus={() => {
                    setDisplayEmojiPicker("none");
                  }}
                />
                <Icon
                  source={sendMessageIcon}
                  width="30px"
                  height="30px"
                  padding="10px"
                  clickEvent={() => {
                    setMessageContent("");
                    sendMessage(
                      messageContent,
                      userEmail,
                      rooms[selectedRoom].id
                    );
                  }}
                />
              </Container>
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
                    <div
                      style={
                        messagesList[messagesList.length - 1] === content
                          ? { marginTop: 100 + "px" }
                          : undefined
                      }
                    >
                      <AppText
                        color="gray"
                        size={16}
                        Style={{ marginLeft: "7px", marginTop: "5px" }}
                      >
                        {messagesList[messagesList.indexOf(content) + 1] &&
                        messagesList[messagesList.indexOf(content) + 1]
                          .email === content.email
                          ? messagesList.indexOf(content) ===
                            messagesList.length - 1
                            ? content.email.replace("@gmail.com", "")
                            : undefined
                          : content.email.replace("@gmail.com", "")}
                      </AppText>
                      <Spacer height={0.5} />
                      <Container
                        flex
                        direction="row"
                        width="fit-content"
                        Style={{
                          maxWidth: "65%",
                          wordBreak: "break-word",
                          borderRadius: "15px",
                          backgroundColor: "#fafafa",
                          border: "1px solid #ccc",
                          margin: "1px",
                          padding: "13px",
                          marginLeft: "7px",
                        }}
                      >
                        <AppText color="#262626" size={20}>
                          {content.message}
                        </AppText>
                      </Container>
                    </div>
                  );
                })}
              </Container>
            </ChatCard>
          ) : (
            <AppText
              color="#ffe5b9"
              weight="bold"
              size={30}
              Style={{ padding: 15 }}
            >
              Add room and start chating !
            </AppText>
          )}
        </Container>
      ) : undefined}

      <RoomsList
        addRoom={addRoom}
        listDisplay={changeDesign ? roomDisplay : "flex"}
      >
        {rooms.map((room) => {
          return (
            <RoomsListItem
              changeColor={() => {
                changeRoom(room);
              }}
            >
              <AppText
                color="white"
                size={30}
                Style={{ paddingLeft: 10 }}
                mobileStyle={{
                  fontSize: 20,
                  color: "#fafafa",
                  padding: 5,
                }}
              >
                {room.name}
              </AppText>
              <AppText color="#94969a" size={16} Style={{ paddingLeft: 10 }}>
                {rooms[selectedRoom] === room
                  ? messagesList.length
                    ? messagesList[0].message.length > 15
                      ? messagesList[0].message.substring(0, 15) + "...."
                      : messagesList[0].message
                    : "Loading..."
                  : undefined}
              </AppText>
            </RoomsListItem>
          );
        })}
      </RoomsList>
    </Container>
  );
};

export default Chat;
