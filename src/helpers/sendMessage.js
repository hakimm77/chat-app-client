const sendMessage = (text, index, roomID) => {
  if (text && index) {
    fetch(
      `https://us-central1-backend-a365f.cloudfunctions.net/app/post?message=${text}&index=${index}&roomID=${roomID}`
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
