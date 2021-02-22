import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import MenuLinks from "./MenuLinks";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "4rem",
    [theme.breakpoints.up('sm')]: {

    },
  },
  container: {
    paddingBottom: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up('sm')]: {
      paddingTop: "6rem",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: 'start',
      width: "80%"
    },
  },
  title: {
    paddingTop: "3rem",
    paddingBottom: "2rem",
    fontFamily: "Archivo narrow",
    fontSize: "2.5rem",
    fontWeight: 600,
    textAlign: "center",
  },
  spanTitle: {
    color: "#E81B7D",
  },
});

const Dashboard = ({ classes, restaurant, auth, profile }) => {
  let menuId = restaurant && restaurant.menuId;
  console.log("profile", profile);

  if (!auth.uid) return <Redirect to="/signin" />;

  window.scrollTo(0, 0)
  return (
    <div className={classes.root}>
    <Typography variant="h1" className={classes.title}>
    <span className={classes.spanTitle}>T</span>ableau de bord
    </Typography>
      <div className={classes.container}>
            <MenuLinks restaurant={restaurant} menuId={menuId} />
            <RestaurantSummary restaurant={restaurant} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
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
