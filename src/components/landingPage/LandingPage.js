import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HowDoesItWork from "./HowDoesItWork";
import Commitments from "./Commitments";
import Pricing from "./Pricing";
import HomeTopBar from "./HomeTopBar";
import MobileMenu from "./MobileMenu";
import ContactSection from "./ContactSection";
import HomeFooter from "./HomeFooter";

const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  mobile: {
    zIndex: 99,
    position: "fixed",
    width: "100%",
    right: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
});

const LandingPage = ({ classes, auth }) => {
  return (
    <div className={classes.root}>
      <HomeTopBar />
      <div className={classes.mobile}>
        <MobileMenu />
      </div>
      <HomeHeader />
      <section id="product">
        <HowDoesItWork />
      </section>
      <section id="engagements">
        <Commitments />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(LandingPage);
