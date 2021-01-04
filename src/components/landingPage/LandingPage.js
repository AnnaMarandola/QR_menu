import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HomeTopBar from "./HomeTopBar";
import HowDoesItWork from "./HowDoesItWork";
import Commitments from "./Commitments";
import Pricing from "./Pricing";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
});

const LandingPage = ({ classes, auth }) => {
  return (
    <div className={classes.root}>
      <div className={classes.topbar}>
        <HomeTopBar />
      </div>
      <HomeHeader />
      <HowDoesItWork />
      <Commitments />
      <Pricing />
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
