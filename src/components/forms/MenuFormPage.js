import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Card, Typography } from "@material-ui/core";
import DishItemEdit from "../menu/DishItemEdit";
import TitleForm from "./TitleForm";
import DishFormContainer from "./DishFormContainer";
import DesignFormContainer from "./DesignFormContainer";
import FormulaFormContainer from "./FormulaFormContainer";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
  },
  titlePage: {
    width: "80%",
    paddingTop: "7rem",
    paddingBottom: "2rem",
    marginLeft: "10%",
    color: theme.palette.primary.main,
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
  titleSection: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingLeft: "1rem",
  },

  modifTitleButton: {
    marginTop: "-2.5rem",
  },
  menuTitle: {
    fontStyle: "italic",
  },
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
        <hr /> Gérez votre carte !<hr />
      </Typography>
      <Card
        className={classes.header}
        style={{ backgroundColor: menuData.headerColor }}
      >
        <Typography
          className={classes.restoName}
          variant="h1"
          style={{
            color: menuData.fontColor,
            fontFamily: menuData.fontFamily,
          }}
        >
          {resto.name}
        </Typography>
        <img className={classes.logo} src={resto.logo} alt="logo" />
      </Card>

      <div className={classes.colorSection}>
        <DesignFormContainer
          menu={menu}
          restaurant={restaurant}
          dishes={dishes}
        />
      </div>

      {restaurant &&
        menu &&
        restaurant.template === "template3" &&
        !menu.title && <TitleForm restaurant={restaurant} menu={menuData} />}

      <div>
        {menu && menu.title && (
          <div className={classes.titleSection}>
            <Typography variant="body1">Titre de mon menu :</Typography>
            <Typography className={classes.menuTitle} variant="h2">
              {menuData.title}
            </Typography>
            <TitleForm
              className={classes.modifTitleButton}
              menu={menu}
              restaurant={restaurant}
            />
          </div>
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
          <DishFormContainer
            restaurant={restaurant}
            menu={menuData}
            dishes={dishes}
          />
        )}

        {restaurant &&
          restaurant.template === "template3" &&
          dishes &&
          dishes.map((dish) => <DishItemEdit dish={dish} key={dish.id} />)}

        {restaurant &&
          (restaurant.template === "template1" || "template2") &&
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
