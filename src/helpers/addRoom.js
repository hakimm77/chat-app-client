import fetchServer from "./fetchServer";

const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (element) => {
    var randomElement = (Math.random() * 16) | 0,
      id = element == "x" ? randomElement : (randomElement & 0x3) | 0x8;
    return id.toString(16);
  });
};

const addRoom = async () => {
  let roomName = prompt("Please enter a name for the room");

  if (roomName) {
    if (roomName.length > 15) {
      alert("maximum lenght of room name is 15 characters");
    }

    if (roomName.length < 15) {
      fetchServer(
        "https://us-central1-backend-a365f.cloudfunctions.net/app/addRooms",
        {
          name: roomName,
          id: generateId(),
        },
        "post"
      );
    }
  }
};

export default addRoom;
