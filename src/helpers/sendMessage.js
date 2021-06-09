import fetchServer from "./fetchServer";

const sendMessage = (text, reply, userEmail, roomID) => {
  if (text && userEmail) {
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
            message: text,
            email: userEmail,
            roomID: roomID,
            reply: reply,
          })
        : JSON.stringify({
            message: text,
            email: userEmail,
            roomID: roomID,
          }),
    };

    const fetchLink =
      "https://us-central1-backend-a365f.cloudfunctions.net/app/post";

    fetchServer(fetchLink, fetchOptions);
  }
};

export default sendMessage;
