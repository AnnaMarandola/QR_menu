import React from "react";
import { withStyles } from "@material-ui/styles";
import AddNewDish from "./AddNewDish";
import { compose } from "redux";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Typography } from "@material-ui/core";
import CreateMenu from "./CreateMenu";
import TitleForm from "./TitleForm";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
  },
  titlePage: {
    marginBottom: '2rem',
  }
});

const MenuFormPage = ({ classes, restaurants, auth, profile, menus }) => {

  let restaurant =restaurants &&
    restaurants.find((restaurant) => restaurant.ownerId === auth.uid);

  let menu = menus && menus.find((menu) => menu.restoId === restaurant.id);

  console.log("restaurant in menuformpage", restaurant && restaurant);
  console.log("profile in menuformpage", profile);
  console.log("menu in menuformpage", menu);

  return (
    <div className={classes.root}>
    <Typography className={classes.titlePage} variant='h1'>Votre carte</Typography>
      {restaurant && !menu ? (
        <CreateMenu restaurant={restaurant} />
      ) : (
        <AddNewDish restaurant={restaurant} />
      )}
      {restaurant && menu &&
      restaurant.template === "template3" ? (
        <TitleForm menu={menu} restaurant={restaurant}/>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    restaurants: state.firestore.ordered.restaurants,
    menus: state.firestore.ordered.menus,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([{ collection: "restaurants" }, { collection: "menus" }])
)(MenuFormPage);
