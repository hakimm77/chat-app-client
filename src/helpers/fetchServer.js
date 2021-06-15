import axios from "axios";

const fetchServer = (url, options, method) => {
  let response;
  if (method === "post") {
    response = axios.post(url, options);
  } else {
    response = axios.get(url);
  }
  return response;
};

export default fetchServer;
