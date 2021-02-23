import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { Typography, withStyles, Button } from "@material-ui/core";
import LOGOBUBBLE from "../../assets/logoBubble.png";

const styles = (theme) => ({
  header: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-around",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      paddingLeft: "10%",
      paddingRight: "10%",
      height: "100vh",
    },
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem",
    [theme.breakpoints.up("sm")]: {
      margin: 0
    },

  },
  bubble: {
    width: "30%",
    [theme.breakpoints.up("sm")]: {
      width: "15%",
    },
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: "3rem",
    fontFamily: "Archivo narrow",
    fontSize: "4rem",
    fontWeight: 700,
    [theme.breakpoints.up("sm")]: {
      fontSize: "6rem",
      marginBottom: "4rem",
    },
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "Archivo narrow",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
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
    // justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginTop: "5rem",
      marginBottom: "5rem",
    },
  },
  connectButton: {
    width: "80%",
    marginLeft: "10%",  
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
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#ee1c80",
    color: "white",
    fontWeight: "600",
    margin: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
    },
  },
  freeTrial: {
    textAlign: "center",
    color: "black",
    marginLeft: "0.3rem",
    marginTop: '-0.5rem',
    [theme.breakpoints.up("sm")]: {
      marginTop: "1rem",
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
      <div className={classes.title}>
        <img src={LOGOBUBBLE} alt="yumi bubble" className={classes.bubble}/>
        <Typography variant="h1" className={classes.headerTitle}>
          <span className={classes.titleSpan}>y</span>umi.pro
        </Typography>
        </div>
        <Typography className={classes.subtitle}>
          {" "}
          Digitalisez votre menu et donnez de la visibilité à votre restaurant !
        </Typography>
        <Typography className={classes.subtitle}>
          {" "}
          Crééz votre carte en ligne en quelques clics{" "}
        </Typography>
        <div className={classes.buttonSection}>
          <Link to="./signin" className={classes.links}>
            <Button className={classes.connectButton}>Connexion</Button>
          </Link>
          <Link className={classes.links} to="./createaccount">
            <Button className={classes.registerButton}>CRÉER UN COMPTE</Button>
            <Typography className={classes.freeTrial}>
              essai gratuit de 14 jours
            </Typography>
          </Link>
        </div>
      </div>
      {/* <div className={classes.headerImage}>
        <img
          src={HEADER}
          className={classes.headerImg}
          alt="illustration cuisinier et QR code"
        />
      </div> */}
    </div>
  );
};

export default compose(withStyles(styles))(HomeHeader);
