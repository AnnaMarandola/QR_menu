import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import TemplateSummary from "./TemplateSummary";

const styles = (theme) => ({});

const Dashboard = ({ restaurants, auth, profile }) => {
  console.log('restaurants', restaurants);
  console.log('auth dashboard', auth);
  let restaurant = restaurants && restaurants.find((restaurant) => restaurant.ownerId === auth.uid)
  console.log('restaurant', restaurant);
  console.log('profile', profile)
  

  if(!auth.uid) return <Redirect to='/signin'/>
  return (
    <div>
      {restaurants &&
      <div>
            <RestaurantSummary restaurant={restaurant} />
            <TemplateSummary restaurant={restaurant} />
      </div>
        };
    </div>)
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    restaurants: state.firestore.ordered.restaurants,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([{ collection: "restaurants" }])
)(Dashboard);
