const likeMessage = async (msg, roomID, user) => {
  console.log(msg);

  const fetchLikeMsg = fetch(
    `https://us-central1-backend-a365f.cloudfunctions.net/app/likeMsg?msg=${msg}&room=${roomID}&user=${user}`
  ).then((response) => {
    return response.json();
  });

  await fetchLikeMsg.then((data) => {
    console.log(data);
  });
};

export default likeMessage;
