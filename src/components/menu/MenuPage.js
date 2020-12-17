import React from "react";
import { Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DishItem from "./DishItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FooterResto from "./FooterResto";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
  },
  menuHearder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2.5rem",
  },
  logo: {
    maxWidth: "40%",
    marginBottom: "2rem",
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
  menuSection: {
    height: "auto",
  },
  categoryHeader: {
    backgroundColor: "white",
  },
  categoryTitle: {
    width: "10rem",
    height: "2rem",
    margin: "auto",
    color: "white",
  },
  dishList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  footerSection: {
    height: "5rem",
    width: "100%",
    position: "relative",
    bottom: "0",
    marginTop: "1rem",
    paddingTop: "1rem",
  },
  mediaLogo: {
    width: "60px",
  },
  contactTitle: {
    textAlign: "center",
  },
});

const MenuPage = ({ classes, restaurant, menu, dishes, auth }) => {
  const resto = { ...restaurant };
  const menuData = { ...menu };

  let publishedDishes =
    dishes && dishes.filter((dish) => dish.published === true);

  const sortedDishes =
    publishedDishes &&
    publishedDishes.reduce(
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
      <div
        className={classes.menuHearder}
        style={{ backgroundColor: menuData.headerColor || "#272727" }}
      >
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

      <div>
        <Typography
          variant="h1"
          className={classes.menuTitle}
          style={{
            fontFamily: menuData.fontFamily || "Roboto",
          }}
        >
          {menuData.title || "La Carte"}
        </Typography>
        {menu && menu.template === "template3" && (
          <div>
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
        )}
        {menu && menu.template === "template1" && (
          <div className={classes.menuSection}>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.categoryHeader}>
                <Button
                  className={classes.categoryTitle}
                  style={{
                    backgroundColor: menuData.headerColor || "#272727",
                  }}
                >
                  Entrée
                </Button>
              </AccordionSummary>
              <AccordionDetails className={classes.dishList}>
                {starters &&
                  starters.map((starter) => (
                    <DishItem
                      key={starter.id}
                      menu={menuData}
                      title={starter.dishName}
                      price={starter.price}
                      ingredients={starter.ingredients}
                      description={starter.description}
                      allergens={starter.checkedAllergens}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.categoryHeader}>
                <Button
                  className={classes.categoryTitle}
                  style={{
                    backgroundColor: menuData.headerColor || "#272727",
                  }}
                >
                  Plats
                </Button>
              </AccordionSummary>
              <AccordionDetails className={classes.dishList}>
                {mains &&
                  mains.map((main) => (
                    <DishItem
                      key={main.id}
                      menu={menuData}
                      title={main.dishName}
                      price={main.price}
                      ingredients={main.ingredients}
                      description={main.description}
                      allergens={main.checkedAllergens}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary className={classes.categoryHeader}>
                <Button
                  className={classes.categoryTitle}
                  style={{
                    backgroundColor: menuData.headerColor || "#272727",
                  }}
                >
                  Desserts
                </Button>
              </AccordionSummary>
              <AccordionDetails className={classes.dishList}>
                {desserts &&
                  desserts.map((dessert) => (
                    <DishItem
                      key={dessert.id}
                      menu={menuData}
                      title={dessert.dishName}
                      price={dessert.price}
                      ingredients={dessert.ingredients}
                      description={dessert.description}
                      allergens={dessert.checkedAllergens}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
      <div
        className={classes.footerSection}
        style={{ backgroundColor: menuData.headerColor || "#272727" }}
      >
        <Typography variant="body1" className={classes.contactTitle}>
          Retrouvez-nous !
        </Typography>
        <FooterResto
          adress={resto.adress}
          postalCode={resto.postalCode}
          city={resto.city}
          phone={resto.phone}
          facebook={resto.facebook}
          instagram={resto.instagram}
        />
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
