const logout = async (history) => {
  await fetch(
    `https://us-central1-backend-a365f.cloudfunctions.net/app/logout`
  );

  localStorage.removeItem("user");
  history.push("/login");
};

export default logout;
