import React, { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import Chat from "./Screens/Chat";
import SignUp from "./Screens/authentication/SignUp";
import Login from "./Screens/authentication/Login";
import Profile from "./Screens/Profile";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./appStyle.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />

        <Redirect from="/" to="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
