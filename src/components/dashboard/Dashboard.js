import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { Divider, Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import TemplateSummary from "./TemplateSummary";
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
    paddingTop: "1rem",
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
  dashboardTitle: {
    marginTop: "3rem",
    width: "80%",
    display: "flex",
    flexDirection: "column"
  },
  titleText: {
    textAlign: "center",
  },
});

const Dashboard = ({ classes, restaurant, auth, profile }) => {
  let menuId = restaurant && restaurant.menuId;
  console.log("profile", profile);

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className={classes.root}>

    <div className={classes.dashboardTitle}>
    <Typography variant="h1" className={classes.titleText}>
    <hr/>Tableau de bord<hr/>
    </Typography>
    </div>
      <div className={classes.container}>
            <RestaurantSummary restaurant={restaurant} />
            <MenuLinks restaurant={restaurant} menuId={menuId} />
        {restaurant && restaurant.template && (
          <TemplateSummary restaurant={restaurant} />
        )}
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
