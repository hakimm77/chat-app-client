import fetchServer from "./fetchServer";

const logout = async (history) => {
  fetchServer(
    `https://us-central1-backend-a365f.cloudfunctions.net/app/logout`
  );

  localStorage.removeItem("user");
  history.push("/login");
};

export default logout;
