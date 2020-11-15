import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";
import DishItemEdit from "../menu/DishItemEdit";
import TitleForm from "./TitleForm";
import DishFormContainer from "./DishFormContainer";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: "2rem"
  },
  titlePage: {
    marginBottom: "2rem",
    marginLeft: "1rem",
  },
  titleSection: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    border : "solid 1px black",
    marginBottom: "1rem",
  },
  modifTitleButton: {
    marginTop: "-2.5rem",
  },
  dishTitle: {
    // fontWeight: 300
    fontStyle: "italic",
  },
  dishesList: {
    textAlign: "center"
  },
  dishesEdited: {
    border : "solid 1px black"
  }
});

const MenuFormPage = ({
  classes,
  restaurant,
  auth,
  profile,
  menu,
  dishes,
  match,
}) => {
  let menuData = { ...menu };


  console.log("restaurant in menuformpage", restaurant);
  console.log("profile in menuformpage", profile);
  console.log("menuID in menuformpage", menuData);
  console.log("dishes in menuformpage", dishes);

  return (
    <div className={classes.root}>
      <Typography className={classes.titlePage} variant="h1" >
        Tableau de bord 
      </Typography>

      {restaurant &&
        menu && restaurant.template === "template3" && !menu.title && (
          <TitleForm restaurant={restaurant} menu={menuData} />
        )}

      {restaurant && !restaurant.menuId &&
        <DishFormContainer
          restaurant={restaurant}
          menu={menuData}
          dishes={dishes}
        />
      }

      <div>
        {menu && menu.title && (
          <div className={classes.titleSection}>
          <Typography variant="body1">
          Titre de mon menu :
        </Typography>
            <Typography className={classes.dishTitle} variant="h2">
              {menuData.title}
            </Typography>
            <TitleForm className={classes.modifTitleButton} menu={menu} restaurant={restaurant} />
          </div>
        )}
        <Typography className={classes.dishesList} variant="body1">
          actuellement à la carte :
        </Typography>
        {dishes &&
          dishes.map((dish) => (
            <DishItemEdit dish={dish} />
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
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
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
