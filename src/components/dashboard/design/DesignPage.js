import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Card, Typography } from "@material-ui/core";
import DesignFormContainer from "../../forms/DesignFormContainer";
import TemplateForm from "../../forms/TemplateForm";
import TemplateFormContainer from "./TemplateFormContainer";

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

});

const DesignPage = ({ classes, restaurant, menu }) => {
  let menuData = { ...menu };
  let resto = { ...restaurant };
  console.log("menuData", menuData.fontColor);

  return (
    <div className={classes.root}>
      <Typography className={classes.titlePage} variant="h1">
        <span>P</span>ersonnalisez le  design de votre carte !
      </Typography>
      { !menuData.template &&
      <TemplateForm />}
      { menuData.template &&
      <div>
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
        />
      </div>
      <TemplateForm/>
      </div>
      }

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
  ])
)(DesignPage);
