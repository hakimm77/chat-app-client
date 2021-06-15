import React, { useState } from "react";
import Chat from "./Screens/Chat";
import SignUp from "./Screens/authentication/SignUp";
import Login from "./Screens/authentication/Login";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./appStyle.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/chat"
          render={() => {
            return user ? <Chat /> : <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="/signup"
          render={() => {
            return user ? <Redirect to="/chat" /> : <SignUp />;
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return user ? <Redirect to="/chat" /> : <Login />;
          }}
        />

        <Redirect from="/" to="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
