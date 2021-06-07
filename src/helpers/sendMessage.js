const sendMessage = (text, reply, userEmail, roomID) => {
  if (text && userEmail) {
    const fetchLink = reply
      ? `https://us-central1-backend-a365f.cloudfunctions.net/app/post?message=${text}&email=${userEmail}&roomID=${roomID}&reply=${reply}`
      : `https://us-central1-backend-a365f.cloudfunctions.net/app/post?message=${text}&email=${userEmail}&roomID=${roomID}`;

    fetch(fetchLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
};

export default sendMessage;
