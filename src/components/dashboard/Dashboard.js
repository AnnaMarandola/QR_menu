import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import TemplateSummary from "./TemplateSummary";
import MenuLinks from "./MenuLinks";

const styles = (theme) => ({});

const Dashboard = ({ restaurant, auth, profile, menus }) => {
  console.log("restaurant in dashboard", restaurant);
  console.log("auth dashboard", auth);
  console.log("*************menus in dashboard", menus);
  let menu = menus && menus.find((menu) => menu.restoId === restaurant.id)
  console.log("+++++++++++++menu in dashboard",  menu);

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div>
      <div>
        <MenuLinks restaurant={restaurant} menu={menu} />
        <RestaurantSummary restaurant={restaurant} />
        <TemplateSummary restaurant={restaurant} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
    menus: state.firestore.ordered.menus,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      where: [["ownerId", "==", props.auth.uid]],
    },
    {
      collection: "menus",
    },
  ])
)(Dashboard);
