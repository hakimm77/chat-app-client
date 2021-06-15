import fetchServer from "./fetchServer";

const sendImageMessage = (img, user, room, reply) => {
  if (img && img.includes("data:image") && room.id) {
    fetchServer(
      `https://us-central1-backend-a365f.cloudfunctions.net/app/postImage`,
      reply
        ? {
            image: img,
            email: user,
            roomID: room.id,
            reply: reply,
          }
        : {
            image: img,
            email: user,
            roomID: room.id,
          },
      "post"
    );
  }
};

export default sendImageMessage;
