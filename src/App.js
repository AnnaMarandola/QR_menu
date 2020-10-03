import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import InfoResto from "./components/forms/InfoResto";
import TemplatePage from "./components/TemplatePage";
import Dashboard from "./components/nav/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/createaccount" component={SignUp} />
          <Route path="/inforesto" component={InfoResto} />
          <Route path="/templatechoice" component={TemplatePage} />
          <Route path="/myaccount" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
