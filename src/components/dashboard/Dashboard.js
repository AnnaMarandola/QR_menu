import React from "react";
import RestaurantSummary from "./RestaurantSummary";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import TemplateSummary from "./TemplateSummary";
import MenuLinks from "./MenuLinks";

const styles = (theme) => ({
  root: {
    marginLeft: "0.5rem",
  }
});

const Dashboard = ({ classes, restaurant, auth, profile }) => {
  console.log('8888888888888restaurant', restaurant);
  console.log('88888888888auth dashboard', auth);
  let menuId = restaurant && restaurant.menuId
  console.log('8888888888888menuID', menuId);
  console.log('profile', profile)
  

  if(!auth.uid) return <Redirect to='/signin'/>
  return (
    <div>
      <div className={classes.root}>
            <MenuLinks restaurant={restaurant} menuId={menuId}/>
            <RestaurantSummary restaurant={restaurant} />
            <TemplateSummary restaurant={restaurant} />
      </div>
    </div>)
}

const mapStateToProps = (state) => {
  console.log(state)
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
      where: ["ownerId", "==", props.auth.uid]
    },
  ])
)(Dashboard);