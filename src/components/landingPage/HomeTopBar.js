import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Typography, withStyles } from "@material-ui/core";
import AVATAR from "../../assets/landingPage/Sans titre (9).png";
const styles = (theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
        height: "5rem",
        borderBottom: "1px solid grey",
        justifyContent: "flex-end",
    },
  },
  homeNav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",


  },
  menuItem: {
      marginRight: "2rem",
      fontFamily: "Archivo narrow",
        fontSize: "1.5rem",
        fontWeight: "300",
        fontColor: "grey",
  },
  avatarImg: {
      width: "5%",
      marginRight: "2rem",
  }
});

const HomeTopBar = ({ classes, auth }) => {
  return <div className={classes.root}>
  <div className={classes.homeNav}>
      <Typography className={classes.menuItem}>BOUTIQUE</Typography>
      <Typography className={classes.menuItem}>NOS ENGAGEMENTS</Typography>
      <Typography className={classes.menuItem}>CONTACT</Typography>
      <img src={AVATAR} alt="avatar" className={classes.avatarImg}/>
    </div>
  </div>;
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
