import React, { useState } from "react";
import Chat from "./Screens/Chat";
import SignUp from "./Screens/authentication/SignUp";
import Login from "./Screens/authentication/Login";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import "./appStyle.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute user={user} path="/chat" Component={Chat} />
        <PublicRoute user={user} path="/signup" Component={SignUp} />
        <PublicRoute user={user} path="/login" Component={Login} />

        <Redirect from="/" to="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
