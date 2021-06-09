import fetchServer from "./fetchServer";

const sendImageMessage = (img, user, room, reply) => {
  if (img && room.id) {
    const fetchLink = `https://us-central1-backend-a365f.cloudfunctions.net/app/postImage`;
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
      body: reply
        ? JSON.stringify({
            image: img,
            email: user,
            roomID: room.id,
            reply: reply,
          })
        : JSON.stringify({
            image: img,
            email: user,
            roomID: room.id,
          }),
    };

    fetchServer(fetchLink, fetchOptions);
  }
};

export default sendImageMessage;
