import React, { useEffect, useState } from "react";
import AppText from "../Components/reusableComponents/AppText";
import ChatCard from "../Components/layoutComponents/ChatCard";
import RoomsList from "../Components/layoutComponents/RoomsList";
import sendMessage from "../helpers/sendMessage";
import RoomsListItem from "../Components/layoutComponents/RoomListItem";
import menuToggle from "../Assets/menu-toggle.png";
import Container from "../Components/reusableComponents/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Icon from "../Components/reusableComponents/Icon";
import Navbar from "../Components/layoutComponents/Navbar";
import WriteMessage from "../Components/layoutComponents/WriteMessage";
import MessagesArea from "../Components/layoutComponents/MessagesArea";

const Chat = ({ history }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [messageContent, setMessageContent] = useState();
  const [reply, setReply] = useState();
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
        sendMessage(messageContent, reply, userEmail, rooms[selectedRoom].id);
        setMessageContent("");
        setReply("");
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
            width="50px"
            height="50px"
            source={menuToggle}
            Style={{ position: "absolute", top: 70, left: 5 }}
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
            <WriteMessage
              displayEmojiPicker={displayEmojiPicker}
              reply={reply}
              roomsArray={rooms}
              selectedRoom={selectedRoom}
              sendMessage={sendMessage}
              setDisplayEmojiPicker={setDisplayEmojiPicker}
              msg={messageContent}
              setMessageContent={setMessageContent}
              setReply={setReply}
              user={userEmail}
            />

            <MessagesArea
              messagesList={messagesList}
              rooms={rooms}
              selectedRoom={selectedRoom}
              userEmail={userEmail}
              setReply={setReply}
            />
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
