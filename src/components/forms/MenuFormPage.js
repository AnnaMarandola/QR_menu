import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";
import DishItemEdit from "../menu/DishItemEdit";
import TitleForm from "./TitleForm";
import DishFormContainer from "./DishFormContainer";
import SelectColor from "./ColorPicker";

const styles = (theme) => ({

  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: "2rem",
  },
  header: {
    height: "20rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titlePage: {
    paddingTop: "5rem",
    color: theme.palette.primary.whiteish,
  },
  restoName: {
    marginTop: "2rem",
  },
  logo: {
    width: "10rem",
  },
  titleSection: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    border: "solid 1px black",
    marginBottom: "1rem",
  },
  modifTitleButton: {
    marginTop: "-2.5rem",
  },
  dishTitle: {
    fontStyle: "italic",
  },
  dishesList: {
    textAlign: "center",
  },
  dishesEdited: {
    border: "solid 1px black",
  },
});

const MenuFormPage = ({ classes, restaurant, menu, dishes, theme }) => {
  let menuData = { ...menu };
  const resto = { ...restaurant };

  return (
    <div className={classes.root}>

      <div className={classes.header} style={{backgroundColor: menuData.headerColor || "#272727" }}>
        <Typography className={classes.titlePage} variant="h1">
          Tableau de bord
        </Typography>
        <Typography className={classes.restoName} variant="h1" style={{ color: menuData.fontColor || "#272727" }}>
          {resto.name}
        </Typography>
        <img className={classes.logo} src={resto.logo} alt="logo" />
      </div>

      <div className={classes.colorSection}>
      <Typography variant="body1">Personnalisez le design de votre carte :</Typography>     
      <SelectColor menu={menu}/>
      </div>

      {restaurant &&
        menu &&
        restaurant.template === "template3" &&
        !menu.title && <TitleForm restaurant={restaurant} menu={menuData} />}

      <div>
        {menu && menu.title && (
          <div className={classes.titleSection}>
            <Typography variant="body1">Titre de mon menu :</Typography>
            <Typography className={classes.dishTitle} variant="h2">
              {menuData.title}
            </Typography>
            <TitleForm
              className={classes.modifTitleButton}
              menu={menu}
              restaurant={restaurant}
            />
          </div>
        )}
        {restaurant && (
          <DishFormContainer
            restaurant={restaurant}
            menu={menuData}
            dishes={dishes}
          />
        )}
        <Typography className={classes.dishesList} variant="body1">
          actuellement à la carte :
        </Typography>
        {dishes &&
          dishes.map((dish) => <DishItemEdit dish={dish} key={dish.id} />)}
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
