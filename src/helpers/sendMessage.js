const sendMessage = (text, userEmail, roomID) => {
  if (text && userEmail) {
    fetch(
      `https://us-central1-backend-a365f.cloudfunctions.net/app/post?message=${text}&email=${userEmail}&roomID=${roomID}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
};

export default sendMessage;
