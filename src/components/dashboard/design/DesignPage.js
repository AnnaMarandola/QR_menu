import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Card, Typography } from "@material-ui/core";
import HeaderDesignForm from "./HeaderDesignForm";
import TemplateForm from "./TemplateForm";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    // backgroundColor: "yellow",
  },
  titlePage: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
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
  headerDesign: {
    width: "100%",
  },
  templateCard: {
    marginBottom: "1rem",
  },
  titleSection: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingLeft: "1rem",
  },
});

const DesignPage = ({ classes, restaurant, menu }) => {
  let menuData = { ...menu };
  let resto = { ...restaurant };
  console.log("menuData", menuData.fontColor);

  return (
    <div className={classes.root}>
          <Typography className={classes.titlePage}>Mon <span className={classes.spanTitle}>Design</span></Typography>
      {!menuData.template && (
        <div>
          <TemplateForm />
        </div>
      )}
      {menuData.template && (
        <div>
          <div className={classes.headerDesign}>
            <HeaderDesignForm menu={menu} restaurant={restaurant} />
          </div>
          <div className={classes.templateCard}>
          <TemplateForm menu={menu}/>
          </div>
        </div>
      )}
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
