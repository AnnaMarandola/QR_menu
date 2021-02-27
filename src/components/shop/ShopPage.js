import React from "react";
import { Button, Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import WIPANIM from "../../assets/workInProgress/shopConstruction.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    jutifyContent: "center",
    marginTop: "6rem",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginTop: "10rem",
    },
  },
  links: {
    textDecoration: "none",
  },
  illustrationSection: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  textSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0%",
      width: "40%",
      paddingRight: "10%",
    },
  },
  illustration: {
    width: "100%",
  },
  title: {
    marginBottom: "3rem",
    fontFamily: "Archivo narrow",
    fontSize: "2.5rem",
    marginTop: "2rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5rem",
      fontSize: "4rem",
      margin: 0,
    },
  },
  titleSpan: {
    color: "#ee1c80",
  },
  subtitle: {
    fontFamily: "Archivo narrow",
    marginBottom: "4rem",
    fontSize: "1.5rem",
    fontWeight: "300",
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#ee1c80",
    color: "white",
    width: "10rem",
    height: "3rem",
    fontSize: "1rem",
  },
});

const ShopPage = ({ classes, auth }) => {
  return (
    <div className={classes.root}>
      <div className={classes.illustrationSection}>
        <img
          src={WIPANIM}
          alt="work in progress illustration"
          className={classes.illustration}
        />
      </div>

      <div className={classes.textSection}>
        <Typography className={classes.title}>
          <span className={classes.titleSpan}>Bientôt</span> en ligne...
        </Typography>
        <Typography className={classes.subtitle}>
          Notre boutique sera disponible très prochainement !
        </Typography>
        { !auth &&
        <NavLink to="./" className={classes.links}>
          <Button className={classes.goBackButton}>Accueil</Button>
        </NavLink>
        }
        { auth &&
        <NavLink to="/dashboard" className={classes.links}>
          <Button className={classes.goBackButton}>Accueil</Button>
        </NavLink>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  )(ShopPage);
