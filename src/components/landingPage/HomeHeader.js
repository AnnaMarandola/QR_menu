import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { Typography, withStyles, Button } from "@material-ui/core";
import HEADER from "../../assets/Sans titre (15).png";
import LOGO from "../../assets/LogoYumi (18).png";

const styles = (theme) => ({
  header: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-around",
    paddingTop: "6rem",
    paddingBottom: "3rem",
    backgroundColor: "#001730",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      paddingLeft: "10%",
      paddingRight: "10%",
      width: "100%",
    },
  },
  titleLogo: {
    width: "40%",
    marginLeft: "20%",
    marginTop: "5rem",
  },
  headerText: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginTop: "-5rem",
    },
  },
  buttonSection: {
    marginTop: "6rem",
    width: "100%",
    display: "flex",
    marginLeft: "3rem",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  connectButton: {
    color: "#FE4A49",
    marginBottom: "1rem",
    marginRight: "1rem",
    fontWeight: "300",
    border: "solid 2px #FE4A49",
    width: "60%",
    marginLeft: "20%",
    height: "3rem",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
      width: "100%",
      marginLeft: "3rem",
    },
  },
  registerButton: {
    backgroundColor: "#FE4A49",
    color: "white",
    fontWeight: "600",
    marginBottom: "1rem",
    borderRadius: "33.33px",
    width: "60%",
    marginLeft: "20%",
    height: "3rem",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
      width: "12rem",
      marginLeft : "-10%",
    },
  },
  freeTrial: {
    color: "#FE4A49",
    marginLeft: "0.3rem",
    marginTop: "-1rem",
    marginBottom: "1rem",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: "1rem",
      marginLeft: "-3rem",
    },
  },
  headerImg: {
    width: "80%",
    marginLeft: "2rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10%",
      width: "100%",

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
      <img src={LOGO} alt="yumi logo" className={classes.titleLogo}/>
        <Typography variant="h6">
          {" "}
          Digitalisez votre menu et donnez de la visibilité à votre restaurant !
        </Typography>
        <Typography variant="h6">
          {" "}
          Crééz votre carte en ligne en quelques clics{" "}
        </Typography>
        <div className={classes.buttonSection}>
          <Link className={classes.links} to="./createaccount">
            <Button className={classes.registerButton}>CRÉER UN COMPTE</Button>
            <Typography className={classes.freeTrial}>
              essai gratuit de 14 jours
            </Typography>
          </Link>
          <Link to="./signin" className={classes.links}>
            <Button className={classes.connectButton}>Connexion</Button>
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
