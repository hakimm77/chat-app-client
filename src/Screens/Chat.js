import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppText from "../Components/AppText";
import ChatCard from "../Components/ChatCard";
import RoomsList from "../Components/RoomsList";
import sendMessage from "../helpers/sendMessage";
import RoomsListItem from "../Components/RoomListItem";
import addRoom from "../helpers/addRoom";
import sendMessageIcon from "../Assets/send-message-icon.png";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  overflow: auto;
  padding-bottom: 20px;
  margin-top: 60px;
`;

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

const MessageContainer = styled.div`
  width: fit-content;
  max-width: 55%;
  word-wrap: break-word;
  border-radius: 15px;
  background-color: #fafafa;
  border: 1px solid #ccc;
  margin: 1px;
  padding: 13px;
  margin-top: 5px;
  margin-left: 7px;
`;

const MesageWriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #bdbdbd;
  overflow: none;
  padding: 7px;
`;

const Sendicon = styled.img`
  width: 30px;
  height: 30px;
  padding: 10px;
  cursor: pointer;
`;

const Chat = () => {
  const [messageContent, setMessageContent] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [counter, setCounter] = useState(rooms);

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
          setCounter([]);

          messagesArr.forEach((childSnapchot) => {
            setMessagesList((previousMessages) => [
              childSnapchot,
              ...previousMessages,
            ]);
          });
          setCounter((previousCounter) => [...previousCounter, "1"]);
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
    getRooms();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [rooms.length, selectedRoom, messageContent]);

  onkeydown = (e) => {
    if (e.keyCode === 13) {
      setMessageContent("");
      sendMessage(messageContent, 1, rooms[selectedRoom].id);
    }
  };

  return (
    <MainContainer
      style={
        rooms.length
          ? undefined
          : {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <RoomsList addRoom={addRoom}>
        {rooms.map((room) => {
          return (
            <RoomsListItem
              /*bgColor={
                selectedRoom === rooms.indexOf(room) ? "#eff8ff" : undefined
              }*/
              changeColor={() => {
                changeRoom(room);
              }}
            >
              <AppText color="white" size={30} Style={{ paddingLeft: 10 }}>
                {room.name}
              </AppText>
              <AppText color="#94969a" size={16} Style={{ paddingLeft: 10 }}>
                {rooms[selectedRoom] === room
                  ? messagesList.length
                    ? messagesList[0].message
                    : "Loading..."
                  : undefined}
              </AppText>
            </RoomsListItem>
          );
        })}
      </RoomsList>
      {rooms.length ? (
        <ChatCard
          roomName={
            rooms[selectedRoom] ? rooms[selectedRoom].name : "Loading..."
          }
        >
          <MesageWriteContainer>
            <MessageInput
              id="input"
              placeholder="Type a message..."
              onChange={(txt) => setMessageContent(txt.currentTarget.value)}
              value={messageContent}
              autoFocus={true}
            />
            <Sendicon
              src={sendMessageIcon}
              onClick={() => {
                setMessageContent("");
                sendMessage(messageContent, 1, rooms[selectedRoom].id);
              }}
            />
          </MesageWriteContainer>
          <MessagesContainer>
            {messagesList.map((content) => {
              return (
                <MessageContainer
                  style={
                    messagesList[messagesList.length - 1] === content
                      ? { marginTop: 100 + "px" }
                      : undefined
                  }
                >
                  <AppText color="#262626" size={20}>
                    {content.message}
                  </AppText>
                </MessageContainer>
              );
            })}
          </MessagesContainer>
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
    </MainContainer>
  );
};

export default Chat;
