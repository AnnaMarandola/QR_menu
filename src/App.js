import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import InfoResto from "./components/forms/InfoResto";
import Dashboard from "./components/dashboard/Dashboard";
import UserIsAuthenticated from "./HOC/UserIsAuthenticated";
import WithTopBar from "./HOC/WithTopBar";
import MenuFormPage from "./components/forms/MenuFormPage";
import MenuPage from "./components/menu/MenuPage";
import TemplateForm from "./components/forms/TemplateForm";
import QrCodePdf from "./components/qrcode/QrCodePdf";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/createaccount" component={SignUp} />
        <Route
          path="/inforesto/add"
          component={UserIsAuthenticated(WithTopBar(InfoResto))}
        />
        <Route
          path="/inforesto/edit/:resto"
          component={UserIsAuthenticated(WithTopBar(InfoResto))}
        />
        <Route
          path="/templatechoice"
          component={UserIsAuthenticated(WithTopBar(TemplateForm))}
        />
        <Route
          exact
          path="/"
          component={UserIsAuthenticated(WithTopBar(Dashboard))}
        />
        <Route
          path="/menuform/:resto/:menu"
          component={UserIsAuthenticated(WithTopBar(MenuFormPage))}
        />
        <Route
          path="/qrcode/:resto/:menu"
          component={UserIsAuthenticated(WithTopBar(QrCodePdf))}
        />
        <Route path="/menupage/:resto/:menu" component={MenuPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
