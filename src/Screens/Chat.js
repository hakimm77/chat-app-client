import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AppText from "../Components/reusableComponents/AppText";
import ChatCard from "../Components/ChatCard";
import RoomsList from "../Components/RoomsList";
import sendMessage from "../helpers/sendMessage";
import RoomsListItem from "../Components/RoomListItem";
import sendMessageIcon from "../Assets/send-message-icon.png";
import menuToggle from "../Assets/menu-toggle.png";
import Container from "../Components/reusableComponents/Container";
import Spacer from "../Components/reusableComponents/Spacer";
import Picker from "emoji-picker-react";
import emojiIcon from "../Assets/emojiIcon.png";
import likeIcon from "../Assets/like-icon.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Icon from "../Components/reusableComponents/Icon";
import Navbar from "../Components/Navbar";
import likeMessage from "../helpers/likeMessage";

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
  const [searchRes, setSearchRes] = useState([]);
  const changeDesign = useMediaQuery("(max-width: 1000px)");

  const loggedIn = async () => {
    document.title = "Chat app | chat";
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
          let messageArr = Object.entries(data);
          setMessagesList([]);

          messageArr.forEach((childSnapchot) => {
            setMessagesList((previousMessages) => [
              Object.values(childSnapchot),
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
  }, [rooms.length, selectedRoom]);

  const searchRooms = (txt) => {
    if (txt) {
      setSearchRes(
        rooms.filter((room) =>
          room.name.toUpperCase().includes(txt.toUpperCase())
        )
      );
    } else {
      setSearchRes([]);
    }
  };

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
      direction={rooms.length ? "row" : "column"}
      height="100%"
      alignVertical={rooms.length ? "space-between" : "center"}
      alignHorizantle={rooms.length ? "" : "center"}
    >
      <Navbar
        history={history}
        search={searchRooms}
        searchResults={searchRes}
        changeRoom={changeRoom}
        searchBar
      />
      {isLogged ? (
        <Container>
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
                    rooms[selectedRoom]
                      ? `Message - ${rooms[selectedRoom].name}`
                      : undefined
                  }
                  onChange={(txt) => setMessageContent(txt.currentTarget.value)}
                  value={messageContent}
                  autoFocus={true}
                  onFocus={() => {
                    setDisplayEmojiPicker("none");
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
                    setMessageContent("");
                    sendMessage(
                      messageContent,
                      userEmail,
                      rooms[selectedRoom].id
                    );
                  }}
                />
              </Container>
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
                    {messagesList[messagesList.indexOf(content) + 1] &&
                    messagesList[messagesList.indexOf(content) + 1][1].email ===
                      content[1].email ? (
                      messagesList.indexOf(content) ===
                      messagesList.length - 1 ? (
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

                    <Spacer height={0.5} />
                    <Container
                      flex
                      direction="row"
                      width="fit-content"
                      doubleClick={() => {
                        likeMessage(
                          content[0],
                          rooms[selectedRoom].id,
                          userEmail
                        );
                      }}
                      Style={{
                        position: "relative",
                        maxWidth: "65%",
                        wordBreak: "break-word",
                        borderRadius: "15px",
                        backgroundColor: "#fafafa",
                        border: "1px solid #ccc",
                        margin: "1px",
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
                  </div>
                );
              })}
            </Container>
          </ChatCard>

          <RoomsList listDisplay={changeDesign ? roomDisplay : "flex"}>
            {rooms.map((room) => {
              return (
                <RoomsListItem
                  changeColor={() => {
                    changeRoom(room);
                  }}
                >
                  <AppText
                    color="#cfc3cf"
                    size={20}
                    Style={{ paddingLeft: 15 }}
                    mobileStyle={{
                      fontSize: 20,
                      color: "#cfc3cf",
                      padding: 5,
                    }}
                  >
                    {room.name}
                  </AppText>
                </RoomsListItem>
              );
            })}
          </RoomsList>
        </Container>
      ) : undefined}
    </Container>
  );
};

export default Chat;
