const fetchServer = (url, options) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export default fetchServer;
