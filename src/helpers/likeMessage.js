import fetchServer from "./fetchServer";

const likeMessage = async (msg, roomID, user) => {
  const fetchLink = `https://us-central1-backend-a365f.cloudfunctions.net/app/likeMsg`;
  const fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      msg: msg,
      room: roomID,
      user: user,
    }),
  };

  fetchServer(fetchLink, fetchOptions);
};

export default likeMessage;
