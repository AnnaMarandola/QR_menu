import React from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import DishItemEdit from "./DishItemEdit";

const styles = (theme) => ({
  rootCard: {
    marginBottom: "1rem",
    backgroundColor: "white",
    paddingBottom: "1rem",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    padding: "1rem",
    paddingBottom: 0,
    fontWeight: 400,
  },
  titleCategory: {
    textAlign: "center",
    fontFamily: "Archivo narrow",
    backgroundColor: "#c7def5",
    padding: "0.5rem",
    marginTop: "0.5rem",
  },
});

const DishListContainer = ({ classes, restaurant, dishes, menu }) => {
  const filteredDishes = dishes && dishes.filter(dish => dish.category === "starter" || "main" || "dessert")
  console.log("filtrés", filteredDishes)
  console.log("dishes", dishes)

  const sortedDishes =
    filteredDishes && filteredDishes.reduce(
      (acc, val) => {
        if (val.category) acc[val.category].push(val);
        return acc;
      },
      { starter: [], main: [], dessert: [] }
    );
  const sorts = { ...sortedDishes };
  console.log("sorts", sorts);
  const starters = sorts && sorts.starter;
  const mains = sorts && sorts.main;
  const desserts = sorts && sorts.dessert;
    
  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>Mes plats:</Typography>
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
            <Typography className={classes.titleCategory}>Les plats</Typography>
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
  connect(mapStateToProps)
)(DishListContainer);
