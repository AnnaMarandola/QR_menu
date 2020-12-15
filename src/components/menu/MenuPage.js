import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DishItem from "./DishItem";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  menuHearder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    maxWidth: "55%",
  },
  restoContact: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  restoName: {
    marginTop: "3rem",
  },
  menuTitle: {
    marginTop: "2rem",
    textAlign: "center",
  },
  gobackButton: {
    marginTop: "2rem",
    marginLeft: "-15rem",
  },
});

const MenuPage = ({ classes, restaurant, menu, dishes, auth }) => {
  const resto = { ...restaurant };
  const menuData = { ...menu };
  let publishedDishes =
    dishes && dishes.filter((dish) => dish.published === true);

  return (
    <div className={classes.root}>
      <div
        className={classes.menuHearder}
        style={{ backgroundColor: menuData.headerColor || "#272727" }}
      >
        {auth && restaurant && auth.uid === restaurant.ownerId && (
          <NavLink to="/">
            <IconButton aria-label="goBack" className={classes.gobackButton}>
              <ArrowBackIosIcon  />
            </IconButton>
          </NavLink>
        )}
        <Typography
          className={classes.restoName}
          variant="h1"
          style={{
            color: menuData.fontColor || "#272727",
            fontFamily: menuData.fontFamily || "Roboto",
          }}
        >
          {resto.name}
        </Typography>
        <img className={classes.logo} src={resto.logo} alt="logo" />
      </div>

      <div
        className={classes.restoContact}
        style={{
          backgroundColor: menuData.headerColor || "#272727",
          color: menuData.fontColor || "#272727",
        }}
      >
        <Typography
          variant="body1"
          style={{ fontFamily: menuData.fontFamily || "Roboto" }}
        >
          {resto.adress}
        </Typography>
        <Typography
          variant="body1"
          style={{ fontFamily: menuData.fontFamily || "Roboto" }}
        >
          {resto.postalCode} - {resto.city}
        </Typography>
        <Typography
          variant="body1"
          style={{ fontFamily: menuData.fontFamily || "Roboto" }}
        >
          {resto.phone}
        </Typography>
        <Typography
          variant="body1"
          style={{ fontFamily: menuData.fontFamily || "Roboto" }}
        >
          {resto.email}
        </Typography>
      </div>

      <div>
        <Typography
          variant="h1"
          className={classes.menuTitle}
          style={{ fontFamily: menuData.fontFamily || "Roboto" }}
        >
          {menuData.title}
        </Typography>
        {publishedDishes &&
          publishedDishes.map((dish) => (
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
    auth: state.firebase.auth,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
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
