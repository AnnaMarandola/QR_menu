import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import InfoResto from "./components/forms/InfoResto";
import Dashboard from "./components/dashboard/Dashboard";
import UserIsAuthenticated from "./HOC/UserIsAuthenticated";
import WithTopBar from "./HOC/WithTopBar";
import MenuFormPage from "./components/dashboard/menu/MenuFormPage";
import MenuPage from "./components/restaurantPage/MenuPage";
import QrCodePdf from "./components/qrcode/QrCodePdf";
import ToastComponent from "./constants/Toast";
import LandingPage from "./components/landingPage/LandingPage";
import ShopPage from "./components/shop/ShopPage";
import projectPage from "./components/shop/projectPage";
import DesignPage from "./components/dashboard/design/DesignPage";

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signin" component={SignIn} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/project" component={projectPage} />
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
          exact
          path="/dashboard"
          component={UserIsAuthenticated(WithTopBar(Dashboard))}
        />
        <Route
          path="/design/:resto/:menu"
          component={UserIsAuthenticated(WithTopBar(DesignPage))}
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
      <ToastComponent/>
    </BrowserRouter>
  );
}

export default App;
