import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({});

const MyAccount = ({ restaurants }) => {
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
  return {
    restaurants: state.restaurant.restaurants,
  };
};

export default compose(withStyles(styles), connect(mapStateToProps))(MyAccount);
