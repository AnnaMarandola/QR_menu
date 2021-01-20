import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";
import DishItemEdit from "../../menu/DishItemEdit";
import TitleForm from "./TitleForm";
import DishFormContainer from "../../forms/DishFormContainer";
import FormulaFormContainer from "../../forms/FormulaFormContainer";
import NewDishContainer from "./NewDishContainer";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    backgroundColor: "yellow",
  },
  titlePage: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 500,
    textAlign: "center",  
  },
  spanTitle: {
    color: "#E81B7D",
  },
  header: {
    height: "17rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  restoName: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  logo: {
    width: "10rem",
  },
  colorSection: {
    width: "100%",
  },
  // titleSection: {
  //   display: "flex",
  //   flexDirection: "column",
  //   paddingTop: "1rem",
  // },
  // modifTitleButton: {
  //   marginTop: "-2.5rem",
  // },
  // menuTitle: {
  //   fontStyle: "italic",
  // },
  formulaSection: {
    textAlign: "center",
    paddingBottom: "2rem",
  },
  formula: {
    margin: "1rem",
  },
  formulaAndPrice: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  },
  comment: {
    position: "absolute",
    left: 50,
  },
  titleCategory: {
    textAlign: "center",
    marginTop: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  dishesTable: {
    paddingTop: "1rem",
    marginBottom: "2rem",
  },
});

const MenuFormPage = ({ classes, restaurant, menu, dishes }) => {
  let menuData = { ...menu };
  let resto = { ...restaurant };
  console.log("menuData", menuData.fontColor);

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
    <div className={classes.root}>
      <Typography className={classes.titlePage} variant="h1">
        Mon <span className={classes.spanTitle}>Menu</span>
      </Typography>




      <div>
        {menu && menu.template !== "Menu du jour" && (
            <TitleForm
              className={classes.modifTitleButton}
              menu={menu}
              restaurant={restaurant}
            />
        )}

        {restaurant && restaurant.template === "template2" && dishes && (
          <div className={classes.formulaSection}>
            <FormulaFormContainer />
              <Typography>Menu du jour</Typography>
            <div className={classes.formulaContainer}>
              <div className={classes.formula}>
                <div className={classes.formulaAndPrice}>
                  <Typography>{menu.formula1}</Typography>
                  <Typography>{menu.formula1Price} { menu.formula1Price ? "€" : null}</Typography>
                </div>
                <Typography className={classes.comment}>{menu.formula1Comment}</Typography>
              </div>
              <div className={classes.formula}>
                <div className={classes.formulaAndPrice}>
                  <Typography>{menu.formula2}</Typography>
                  <Typography>{menu.formula2Price} { menu.formula2Price ? "€" : null}</Typography>
                </div>
                <Typography className={classes.comment}>{menu.formula2Comment}</Typography>
              </div>
            </div>
          </div>
        )}

        {restaurant && (
          <NewDishContainer
            restaurant={restaurant}
            menu={menuData}
            dishes={dishes}
          />
        )}

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
