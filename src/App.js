import React from "react";
import Chat from "./Screens/Chat";
import SignUp from "./Screens/authentication/SignUp";
import Login from "./Screens/authentication/Login";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./appStyle.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />

        <Redirect from="/" to="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
