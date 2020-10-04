import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const styles = (theme) => ({});

const Dashboard = ({ restaurants }) => {
  console.log(restaurants);
  return (
    <div>
      {restaurants &&
        restaurants.map((restaurant) => {
          return (
            <RestaurantSummary restaurant={restaurant} key={restaurant.id} />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    restaurants: state.firestore.ordered.restaurants,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([{ collection: "restaurants" }])
)(Dashboard);
