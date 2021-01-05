import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HowDoesItWork from "./HowDoesItWork";
import Commitments from "./Commitments";
import Pricing from "./Pricing";
import AVATAR from "../../assets/landingPage/Sans titre (9).png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { NavLink } from "react-router-dom";


const styles = (theme) => ({
  root: {
    width: "100%",
  },
  rootNav: {
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
  navlink: {
    textDecoration: "none",
    color: "inherit",
  },
});

const LandingPage = ({ classes, auth }) => {
  return (
    <div className={classes.root}>
      <div className={classes.rootNav}>
        <div className={classes.homeNav}>
          <AnchorLink href="#product" className={classes.navlink}>
            <Typography className={classes.menuItem}>PRODUITS</Typography>
          </AnchorLink>
          <AnchorLink href="#pricing" className={classes.navlink}>
            <Typography className={classes.menuItem}>ABONNEMENTS</Typography>
          </AnchorLink>
          <AnchorLink href="#engagements" className={classes.navlink}>
            <Typography className={classes.menuItem}>
              NOS ENGAGEMENTS
            </Typography>
          </AnchorLink>
          {/* <AnchorLink href="#contact" className={classes.navlink}> */}
            <Typography className={classes.menuItem}>CONTACT</Typography>
          {/* </AnchorLink> */}
          <NavLink to="./shop" className={classes.navlink}>
            <Typography className={classes.menuItem}>BOUTIQUE</Typography>
          </NavLink>
          {/* <NavLink to="./signin"> */}
          <img src={AVATAR} alt="avatar" className={classes.avatarImg} />
          {/* </NavLink> */}
        </div>
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
