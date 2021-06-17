import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AppText from "../Components/reusableComponents/AppText";
import ChatCard from "../Components/layoutComponents/ChatCard";
import RoomsList from "../Components/layoutComponents/RoomsList";
import sendMessage from "../helpers/sendMessage";
import RoomsListItem from "../Components/layoutComponents/RoomListItem";
//import menuToggle from "../Assets/menu-toggle.png";
import Container from "../Components/reusableComponents/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Icon from "../Components/reusableComponents/Icon";
import Navbar from "../Components/layoutComponents/Navbar";
import WriteMessage from "../Components/layoutComponents/WriteMessage";
import MessagesArea from "../Components/layoutComponents/MessagesArea";
import firebase from "../helpers/firebaseConfig";

const Chat = () => {
  const changeDesign = useMediaQuery("(max-width: 1000px)");
  const [reply, setReply] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(changeDesign ? null : 0);
  const [rooms, setRooms] = useState([]);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("user"));
  const [roomDisplay, setRoomDisplay] = useState("flex");
  const [mobileChat, setMobileChat] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref("roomList")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let roomsArr = Object.values(data);
          let newRooms = [];
          roomsArr.forEach((childSnapchot) => {
            newRooms = [...newRooms, childSnapchot];
          });
          setRooms(newRooms);
        }
      });
  }, []);

  const changeRoom = (room) => {
    if (selectedRoom !== rooms.indexOf(room)) {
      setMessagesList([]);
      setSelectedRoom(rooms.indexOf(room));
      setReply("");
    }
    setRoomDisplay("none");
    setMobileChat(true);
  };

  useEffect(() => {
    if (rooms[selectedRoom]) {
      firebase
        .database()
        .ref("/" + rooms[selectedRoom].id + "/messages")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          if (data) {
            let messageArr = Object.entries(data);
            let newMessages = [];

            messageArr.forEach((childSnapchot) => {
              newMessages = [Object.values(childSnapchot), ...newMessages];
            });
            setMessagesList(newMessages);
          }
        });
    }
  }, [rooms.length, selectedRoom]);

  return (
    <Container
      flex
      direction={rooms.length ? "row" : "column"}
      height="100%"
      alignVertical={rooms.length ? "space-between" : "center"}
      alignHorizantle={rooms.length ? "" : "center"}
    >
      <Helmet title="Chat app | chat" />
      <Navbar changeRoom={changeRoom} user={userEmail} rooms={rooms} />
      <Container>
        <ChatCard
          display={changeDesign ? (mobileChat ? "flex" : "none") : "flex"}
          roomName={
            rooms[selectedRoom] ? rooms[selectedRoom].name : "Loading..."
          }
          returnMenu={() => {
            setMobileChat(false);
            setRoomDisplay("flex");
          }}
        >
          <WriteMessage
            reply={reply}
            roomsArray={rooms}
            selectedRoom={selectedRoom}
            sendMessage={sendMessage}
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
          {rooms.map((room, idx) => {
            return (
              <RoomsListItem
                key={idx}
                changeRoom={() => {
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
    </Container>
  );
};

export default Chat;
