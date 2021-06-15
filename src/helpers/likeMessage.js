import fetchServer from "./fetchServer";

const likeMessage = async (msg, roomID, user) => {
  fetchServer(
    `https://us-central1-backend-a365f.cloudfunctions.net/app/likeMsg`,
    {
      msg: msg,
      room: roomID,
      user: user,
    },
    "post"
  );
};

export default likeMessage;
