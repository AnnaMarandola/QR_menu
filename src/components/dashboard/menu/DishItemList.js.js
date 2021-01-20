import React, { useState } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../../store/actions/menuActions";
import AddNewDish from "./AddNewDish";
import DishItemEdit from "./DishItemEdit";



const styles = (theme) => ({
  rootCard: {
    marginBottom: "1rem",
    backgroundColor: "white",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#E81B7D",
    padding: "1rem",
    paddingBottom: 0,
    fontWeight: 400,
  },
  addButton: {
    position: "relative",
    right: "-12rem",
    top: "-1.9rem",
  },

});

const DishFormContainer = ({ classes, restaurant, menu, dishes }) => {

  const menuId = menu && menu.id;
  const sortedDishes =
    dishes &&
    dishes.reduce(
      (acc, val) => {
        if (val.category) acc[val.category].push(val);
        return acc;
      },
      { starter: [], main: [], dessert: [] }
    );
  const sorts = { ...sortedDishes };
  const starters = sorts && sorts.starter;
  const mains = sorts && sorts.main;
  const desserts = sorts && sorts.dessert;


  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
        Mes plats:
      </Typography>
      {restaurant &&
          restaurant.template === "Carte thématique" &&
          dishes &&
          dishes.map((dish) => <DishItemEdit dish={dish} key={dish.id} />)}

        {restaurant &&
          (restaurant.template === "Carte complète" || "Menu du jour") &&
          dishes && (
            <div className={classes.dishesTable}>
              <Typography className={classes.titleCategory}>
                Les entrées
              </Typography>
              {starters.map((starter) => (
                <DishItemEdit dish={starter} key={starter.id} />
              ))}
              <Typography className={classes.titleCategory}>
                Les plats
              </Typography>
              {mains.map((main) => (
                <DishItemEdit dish={main} key={main.id} />
              ))}
              <Typography className={classes.titleCategory}>
                Les desserts
              </Typography>
              {desserts.map((dessert) => (
                <DishItemEdit dish={dessert} key={dessert.id} />
              ))}
            </div>
          )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { updateMenu }),
  firestoreConnect((props) => [
    {
      collection: "menus",
      storeAs: "menu",
      where: [["menu.restoId", "==", props.restaurant.id]],
    },
  ])
)(DishFormContainer);
