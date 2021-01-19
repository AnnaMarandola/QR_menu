import React, { useState } from "react";
import { Button, Link, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createMenu } from "../../store/actions/menuActions";
import { updateRestaurantMenu } from "../../store/actions/restaurantActions";

const styles = (theme) => ({
  startButton: {
    backgroundColor: "#E81B7D",
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
  },
  links: {
    textDecoration: "none",
  },
  nextButton: {
    color: "#E81B7D",
    marginTop: "1rem",
    marginLeft: "75%",
    border: "solid 1px #e81b7d",
  },
});

const StartMenu = ({
  restaurant,
  classes,
  menu,
  createMenu,
  updateRestaurantMenu,
}) => {
  console.log("restooooo", restaurant);
  const resto = { ...restaurant };
  const restoId = resto.id;
  console.log("resto id", resto.id);
  const menuData = { ...menu };
  console.log("menu id", menuData.id);

  const [started, setStarted] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    createMenu({ restoId: restoId });
    setStarted(true);
  };

  const handleNext = (e) => {
    updateRestaurantMenu({ restoId: restoId, menuId: menuData.id });
  };

  return (
    <div>
      {!started && (
        <div>
          <Button className={classes.startButton} onClick={handleStart}>
            Commencer
          </Button>
        </div>
      )}
      {started && (
        <div>
          <Typography>
            Commencez par choisir un modèle de mise en page pour votre carte.
          </Typography>
          <Typography>
            Vous pourrez ensuite ajouter vos plats et personnaliser le design de
            la page.
          </Typography>
          <NavLink
            to={`/design/${restoId}/${menuData.id}`}
            className={classes.links}
          >
            <Button onClick={handleNext} className={classes.nextButton}>
              Suivant
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMenu: (menu) => dispatch(createMenu(menu)),
    updateRestaurantMenu: (payload) => dispatch(updateRestaurantMenu(payload)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "menus",
      where: [["menu.ownerId", "==", props.auth.uid]],
    },
  ])
)(StartMenu);
