import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({});

const Dashboard = ({ restaurants, auth }) => {
  console.log('restaurants', restaurants);
  console.log('auth dashboard', auth);
  let restaurant = restaurants && restaurants.find((restaurant) => restaurant.authorId === auth.uid)
  console.log('restaurant', restaurant);
  

  if(!auth.uid) return <Redirect to='/signin'/>
  return (
    <div>
      {restaurants &&
            <RestaurantSummary restaurant={restaurant} />
        };
    </div>)
}

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
