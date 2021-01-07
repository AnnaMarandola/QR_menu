import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { Typography, withStyles, Button } from "@material-ui/core";
import HEADER from "../../assets/landingPage/illustration-header.png";

const styles = (theme) => ({
  header: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-around",
    paddingTop: "6rem",
    paddingBottom: "3rem",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },
  headerTitle: {
    marginBottom: "2rem",
    marginTop: "-3rem",
    fontFamily: "Archivo narrow",
    fontSize: "4rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5rem",
      fontSize: "6rem",
    },
  },
  titleSpan: {
    color: "#ee1c80",
  },
  headerText: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5rem",
    },
  },
  buttonSection: {
    marginTop: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  connectButton: {
    backgroundColor: "#c7def5",
    color: "black",
    marginBottom: "1rem",
    marginRight: "1rem",
    fontWeight: "300",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
    },
  },
  registerButton: {
    backgroundColor: "#ee1c80",
    color: "white",
    fontWeight: "600",
    marginBottom: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
    },
  },
  headerImg: {
    width: "80%",
    marginLeft: "2rem",
    [theme.breakpoints.up("sm")]: {
      width: "120%",
      margin: "0",
    },
  },
  links: {
    textDecoration: "none",
  },
});

const HomeHeader = ({ classes }) => {
  return (
    <div className={classes.header}>
      <div className={classes.headerText}>
        <Typography variant="h1" className={classes.headerTitle}>
          <span className={classes.titleSpan}>QR</span>Menu
        </Typography>
        <Typography variant="h6">
          {" "}
          Digitalisez votre menu et donnez de la visibilité à votre restaurant !
        </Typography>
        <Typography variant="h6">
          {" "}
          Crééz votre carte en ligne en quelques clics{" "}
        </Typography>
        <div className={classes.buttonSection}>
          <Link to="./signin" className={classes.links}>
            <Button className={classes.connectButton}>Connexion</Button>
          </Link>
          <Link className={classes.links} to="./createaccount">
            <Button className={classes.registerButton}>
              Essai gratuit de 14 jours
            </Button>
          </Link>
        </div>
      </div>
      <div className={classes.headerImage}>
        <img
          src={HEADER}
          className={classes.headerImg}
          alt="illustration cuisinier et QR code"
        />
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(HomeHeader);
