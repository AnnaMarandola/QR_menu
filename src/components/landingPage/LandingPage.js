import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HowDoesItWork from "./HowDoesItWork";
import Commitments from "./Commitments";
import Pricing from "./Pricing";
import BackToTopButton from "../UI kit/BackToTopButton";
import HomeTopBar from "./HomeTopBar";
import MobileMenu from "./MobileMenu";



const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  mobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    }
  }
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
        <BackToTopButton />
      </section>
      <section id="engagements">
        <Commitments />
        <BackToTopButton />
      </section>
      <section id="pricing">
        <Pricing />
        <BackToTopButton />
      </section>
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
