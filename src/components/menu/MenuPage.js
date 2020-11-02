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
    const restoId = this.props.match.params.id;
    console.log("restoId in componentDIdMount", restoId);
  }

  componentDidUpdate() {
    const menuId = this.props.restaurant.menuId;
    console.log("menuId in componentDIdMount", menuId);
  }

  render() {
    const { classes, restaurant, menu } = this.props;
    const resto = { ...restaurant };
    console.log("RESTO IN MENUPAGE", resto);
    const menuData = { ...menu };
    console.log("MENU IN MENUPAGE", menuData);

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
          <DishList menu={menuData}/>
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
  ])
)(MenuPage);
