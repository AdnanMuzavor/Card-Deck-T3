import "./App.css";
import React from "react";

import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import HomeScreen from "./Screen/Homescreen";

function App() {
  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
      </Switch>
    );
  };

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
