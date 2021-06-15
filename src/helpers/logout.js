import fetchServer from "./fetchServer";

const logout = () => {
  fetchServer(
    `https://us-central1-backend-a365f.cloudfunctions.net/app/logout`,
    "get"
  );

  localStorage.removeItem("user");
  window.location.reload();
};

export default logout;
