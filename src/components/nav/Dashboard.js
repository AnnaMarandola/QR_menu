import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({});

const Dashboard = ({ restaurants, auth }) => {
  console.log(restaurants);
  if(!auth.uid) return <Redirect to='/signin'/>
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
    auth: state.firebase.auth,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([{ collection: "restaurants" }])
)(Dashboard);
