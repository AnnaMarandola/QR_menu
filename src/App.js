import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import InfoResto from "./components/forms/InfoResto";
import TemplatePage from "./components/TemplatePage";
import Dashboard from "./components/nav/Dashboard";
import UserIsAuthenticated from "./HOC/UserIsAuthenticated";
import WithTopBar from "./HOC/WithTopBar";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/createaccount" component={SignUp} />
          <Route path="/inforesto" component={UserIsAuthenticated(WithTopBar(InfoResto))} />
          <Route path="/templatechoice" component={UserIsAuthenticated(WithTopBar(TemplatePage))} />
          <Route path="/" component={UserIsAuthenticated(WithTopBar((Dashboard)))} />
          {/* <MenuForm path="/menuform" component={MenuForm} /> */}
          {/* <MenuForm path="/menupage" component={MenuPage} /> */}
        </Switch>
    </BrowserRouter>
  );
}

export default App;
