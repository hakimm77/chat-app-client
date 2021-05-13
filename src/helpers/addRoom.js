const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (element) => {
    var randomElement = (Math.random() * 16) | 0,
      id = element == "x" ? randomElement : (randomElement & 0x3) | 0x8;
    return id.toString(16);
  });
};

const addRoom = () => {
  let roomName = prompt("Please enter a name for the room");

  if (roomName) {
    fetch(
      `https://us-central1-backend-a365f.cloudfunctions.net/app/addRooms?name=${roomName}&id=${generateId()}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    window.location.reload();
  }
};

export default addRoom;
