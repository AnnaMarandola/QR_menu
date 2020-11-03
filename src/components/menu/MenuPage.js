import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DishList from "./DishList";

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
  menuContent: {

  },
  menuTitle: {
    marginTop: "2rem",
    textAlign: "center"
  },
});

class MenuPage extends Component {
  componentDidMount() {
    const restoId = this.props.match.params.resto;
    console.log("MMMMMMMMMMMMMMrestoId in componentDIdMount", restoId);
    const menuId = this.props.match.params.menu;
    console.log("MMMMMMMMMMMMMMMMmenuId in componentDIdMount", menuId);
  }



  render() {
    const { classes, restaurant, menu, dishes } = this.props;
    const resto = { ...restaurant };
    console.log("++++++++RESTO IN MENUPAGE", resto);
    const menuData = { ...menu };
    console.log("+++++++++MENU IN MENUPAGE", menuData);


    return (
      <div className={classes.root}>
        <div className={classes.menuHearder}>
          <Typography className={classes.restoName} variant="h1">
            {resto.name}
          </Typography>
          <img className={classes.logo} src={resto.logo} alt="logo" />
        </div>
        <div className={classes.restoContact}>
          <Typography variant="body1"> {resto.adress} </Typography>
          <Typography variant="body1">
            {" "}
            {resto.postalCode} {resto.city}{" "}
          </Typography>
          <Typography variant="body1"> {resto.phone} </Typography>
          <Typography variant="body1"> {resto.email} </Typography>
        </div>
        <div className={classes.menuContent}>
          <Typography variant="h1" className={classes.menuTitle}>
            {resto.template === "template3" ? menuData.title : "La carte"}
          </Typography>
          { dishes && dishes.map((dish) => (
          <DishList 
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
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
      menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
      dishes: state.firestore.ordered.dishes
    };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      doc: props.restoId,
    },
    {
      collection: "menus",
      doc: props.menuId,
    },
    {
      collection: "dishes",
    },
  ])
)(MenuPage);
