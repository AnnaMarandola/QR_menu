import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography, Fab, Card } from "@material-ui/core";
import HeaderDesignForm from "./HeaderDesignForm";
import TemplateForm from "./TemplateForm";
import GalleryCard from "./add-carousel/GalleryCard";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import DemoMobile from "./DemoMobile";

const styles = (theme) => ({
  root: {
    paddingTop: "4rem",
    [theme.breakpoints.up("md")]: {
      width: "80%",
      marginLeft: "10%",
    },
  },
  titlePage: {
    paddingBottom: "1rem",
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 500,
    textAlign: "center",
  },
  spanTitle: {
    color: "#E81B7D",
  },
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  vizContainer: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      backgroundColor: "white",
      marginTop: "5rem",
      width: "45%",
      height: "130vh",
      minWidth: 500,
      flexDirection: "column",
    },
  },
  formContainer: {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    [theme.breakpoints.up("md")]: {
      width: "45%",
    },
  },
  phoneContainer: {
    width: "100%",
    minWidth: 500,
    height: "130vh",
    position: "relative",
    top: 0,

  },
  cardHeader: {
    [theme.breakpoints.up("md")]: {
      fontFamily: "Archivo narrow",
      fontSize: "1.2rem",
      fontWeight: 400,
      color: "#E81B7D",
      padding: "1rem",
    },
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
  goBackButton: {
    margin: "2rem",
  },
  backArrow: {
    fill: "#E81B7D",
  },
});

const DesignPage = ({ classes, restaurant, menu, auth }) => {
  let menuData = { ...menu };

  return (
    <div className={classes.root}>
      <NavLink to="/dashboard">
        <Fab size="small" className={classes.goBackButton}>
          <ArrowBackOutlinedIcon className={classes.backArrow} />
        </Fab>
      </NavLink>
      <Typography className={classes.titlePage}>
        Mon <span className={classes.spanTitle}>Design</span>
      </Typography>
      <div className={classes.rootContainer}>
        <Card className={classes.vizContainer}>
          <Typography className={classes.cardHeader}>
            Pré-visualisation
          </Typography>
          <div 
          className={classes.phoneContainer}
          >
          <DemoMobile menu={menu} restaurant={restaurant}/>
          </div>
        </Card>
        <div className={classes.formContainer}>
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
              <div>
                <GalleryCard restaurant={restaurant} />
              </div>
              <div className={classes.templateCard}>
                <TemplateForm menu={menu} restaurant={restaurant} />
              </div>
            </div>
          )}
        </div>
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
