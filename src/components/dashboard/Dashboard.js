import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import MenuLinks from "./MenuLinks";
import Options from "./Options";
import QrcodeSailingCard from "./QrcodeSailingCard";
import AnchorLink from "react-anchor-link-smooth-scroll";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "4rem",
    backgroundColor: "#001730",
    [theme.breakpoints.up("md")]: {
      width: "90%",
      marginLeft: "5%",
    },
  },
  container: {
    paddingBottom: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexWrap: "wrap",
      paddingTop: "6rem",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "start",
      // justifyContent: "center",
      width: "100%",
    },
  },
  title: {
    paddingTop: "3rem",
    paddingBottom: "3rem",
    fontFamily: "Archivo narrow",
    fontSize: "2.5rem",
    fontWeight: 400,
    textAlign: "center",
    color: "white",
  },
  list: {
    listStyleType: "none",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
        }
  },
  titleNav: {
    color: "#4ad7d1",
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontFamily: "Archivo narrow",
  },
  links: {
    color: "white",
    marginTop: "0..5rem",
  }
});

const Dashboard = ({ classes, restaurant, auth, profile }) => {
  let menuId = restaurant && restaurant.menuId;
  let restoId = restaurant && restaurant.id;

  if (!auth.uid) return <Redirect to="/signin" />;

  window.scrollTo(0, 0);
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Tableau de bord
      </Typography>
      <nav>
        <ul className={classes.list}>
        <AnchorLink href="#menu" className={classes.links}>
          <li className={classes.titleNav}>Ma carte</li>
          </AnchorLink>
          <AnchorLink href="#resto" className={classes.links}>
          <li className={classes.titleNav}>Mon établissement</li>
          </AnchorLink>
          <AnchorLink href="#qrcode" className={classes.links}>
          <li className={classes.titleNav}>Mon QR code</li>
          </AnchorLink>
        </ul>
      </nav>
      <div className={classes.container}>
      <section id="menu">
        <MenuLinks restaurant={restaurant} menuId={menuId} />
        </section>
        <section id="resto">
        <RestaurantSummary restaurant={restaurant} />
        </section>
        <Options restaurant={restaurant} />
      </div>
      <section id="qrcode">
      <QrcodeSailingCard restoId={restoId} menuId={menuId} />
      </section>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      where: ["ownerId", "==", props.auth.uid],
    },
  ])
)(Dashboard);
