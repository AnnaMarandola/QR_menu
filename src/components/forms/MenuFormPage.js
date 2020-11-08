import React from "react";
import { withStyles } from "@material-ui/styles";
import AddNewDish from "./AddNewDish";
import { compose } from "redux";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";
import CreateMenu from "./CreateMenu";
import TitleForm from "./TitleForm";
import DishItemEdit from "../menu/DishItemEdit";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
  },
  titlePage: {
    marginBottom: '2rem',
  }
});

const MenuFormPage = ({ classes, restaurant, auth, profile, menu, dishes }) => {



  console.log("restaurant in menuformpage", restaurant);
  console.log("profile in menuformpage", profile);
  console.log("menu in menuformpage", menu);
  console.log("dishes in menuformpage", dishes);

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
      ) : null
      }
      <div>
        {dishes && dishes.map((dish) => (
          <DishItemEdit key={dish.id} title={dish.dishName} price={dish.price}/>
        ))}
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
  menu: state.firestore.ordered.menus &&
    state.firestore.ordered.menus[0],
  dishes: state.firestore.ordered.dishes,

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
      doc: props.match.params.resto,
    },
    {
      collection: "menus",
      doc: props.match.params.menu,
    },
    {
      collection: "dishes",
      where: ["menuId", "==", props.match.params.menu],
    },
  ])
)(MenuFormPage);
