import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import InfoResto from "./components/forms/InfoResto";
import TemplatePage from "./components/TemplatePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        {/* <SignIn /> */}
        <Switch>
          <Route path="/singin" component={SignIn} />
          <Route path="/createaccount" component={SignUp} />
          <Route path="/inforesto" component={InfoResto} />
          <Route path="/templatechoice" component={TemplatePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
