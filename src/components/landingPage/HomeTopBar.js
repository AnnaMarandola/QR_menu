import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Typography, withStyles } from "@material-ui/core";
import AVATAR from "../../assets/landingPage/Sans titre (9).png";
import { NavLink } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      height: "5rem",
      borderBottom: "1px solid grey",
    },
  },
  homeNav: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  menuItem: {
    marginRight: "2rem",
    fontFamily: "Archivo narrow",
    fontSize: "1.5rem",
    fontWeight: "300",
    fontColor: "grey",

  },
  avatarImg: {
    width: "3%",
    marginRight: "3rem",
  },
});

const HomeTopBar = ({ classes, auth }) => {
  return (
    <div className={classes.root}>
      <div className={classes.homeNav}>
        <Typography className={classes.menuItem}>BOUTIQUE</Typography>
        <Typography className={classes.menuItem}>ABONNEMENTS</Typography>
        <Typography className={classes.menuItem}>NOS ENGAGEMENTS</Typography>
        <Typography className={classes.menuItem}>CONTACT</Typography>
        {/* <NavLink to="./signin"> */}
        <img src={AVATAR} alt="avatar" className={classes.avatarImg} />
        {/* </NavLink> */}
      </div>
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
)(HomeTopBar);
