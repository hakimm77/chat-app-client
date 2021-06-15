import fetchServer from "./fetchServer";

const sendMessage = (text, reply, userEmail, roomID) => {
  if (text && userEmail) {
    fetchServer(
      "https://us-central1-backend-a365f.cloudfunctions.net/app/post",
      reply
        ? {
            message: text,
            email: userEmail,
            roomID: roomID,
            reply: reply,
          }
        : {
            message: text,
            email: userEmail,
            roomID: roomID,
          },
      "post"
    );
  }
};

export default sendMessage;
