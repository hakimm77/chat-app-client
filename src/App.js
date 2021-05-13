import React from "react";
``;
import HomeScreen from "./Screens/HomeScreen";
import Chat from "./Screens/Chat";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./appStyle.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/chat" component={Chat} />

        <Redirect from="/" to="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
