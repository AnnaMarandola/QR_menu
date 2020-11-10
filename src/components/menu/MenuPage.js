import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DishItem from "./DishItem";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  menuHearder: {
    backgroundColor: theme.palette.primary.red,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    maxWidth: "55%",
  },
  restoContact: {
    backgroundColor: theme.palette.primary.red,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  restoName: {
    marginTop: "3rem",
  },
  menuContent: {},
  menuTitle: {
    marginTop: "2rem",
    textAlign: "center",
  },
});

const MenuPage = ({ classes, restaurant, menu, dishes }) => {
  const resto = { ...restaurant };
  const menuData = { ...menu };

  return (
    <div className={classes.root}>

      <div className={classes.menuHearder}>
        <Typography className={classes.restoName} variant="h1">
          {resto.name}
        </Typography>
        <img className={classes.logo} src={resto.logo} alt="logo" />
      </div>

      <div className={classes.restoContact}>
        <Typography variant="body1">{resto.adress}</Typography>
        <Typography variant="body1">
          {resto.postalCode} - {resto.city}
        </Typography>
        <Typography variant="body1">{resto.phone}</Typography>
        <Typography variant="body1">{resto.email}</Typography>
      </div>

      <div className={classes.menuContent}>
        <Typography variant="h1" className={classes.menuTitle}>
          {menuData.title}
        </Typography>
        {
          dishes && dishes.map((dish) => (
            <DishItem
              key={dish.id}
              menu={menuData}
              title={dish.dishName}
              price={dish.price}
              ingredients={dish.ingredients}
              description={dish.description}
              allergens={dish.checkedAllergens}
            />
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
)(MenuPage);
