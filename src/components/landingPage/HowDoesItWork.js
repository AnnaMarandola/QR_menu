import React from "react";
import { compose } from "redux";
import { Button, Typography, withStyles } from "@material-ui/core";
import HDIW1 from "../../assets/landingPage/HDIW1.png";
import HDIW2 from "../../assets/landingPage/HDIW2.png";
import HDIW3 from "../../assets/landingPage/HDIW3.png";
import { NavLink } from "react-router-dom";
import BackToTopButton from "../UI kit/BackToTopButton";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: "#e1d0d4",
    paddingBottom: "0.5rem",
    paddingTop: "2rem",
    [theme.breakpoints.up("sm")]: {
    },
  },
  explanations: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "6rem",
    },
  },
  stepSection: {
    marginBottom: "5rem",
    [theme.breakpoints.up("sm")]: {
      width: "33%",
    },
  },
  HTitle: {
    marginTop: "2rem",
    marginBottom: "4rem",
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      marginTop: "4rem",
      fontSize: "4rem",
    },
  },
  HTitleSpan: {
    color: "#ee1c80",
  },
  stepImg: {
    width: "30%",
  },
  stepTitle: {
    fontSize: "1rem",
    width: "70%",
    marginLeft: "15%",
    marginBottom: "0.5rem",
  },
  stepText: {
    width: "80%",
    marginTop: "1rem",
    marginLeft: "10%",
    textAlign: "justify",
  },
  shopButton: {
    marginTop: "-6rem",
    backgroundColor: "#ee1c80",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      marginTop: "-6rem",
      marginLeft: "65%",
    },
  },
  links: {
    textDecoration: "none",
  },
});

const steps = [
  {
    image: HDIW1,
    title: "1. Je crée mon compte",
    text:
      "Choisissez un modèle pour votre carte en ligne. Vous pouvez maintenant personnaliser votre page à votre guise ! logo, charte graphique, gallerie d'images, contact, réseaux sociaux... ",
  },
  {
    image: HDIW2,
    title: "2. Je gère ma carte en ligne",
    text:
      "Depuis votre compte, vous pouvez facilement ajouter, modifier ou supprimer les plats de votre carte ! Mise à jour instantanée, assistance téléphonique 24h/24.",
  },
  {
    image: HDIW3,
    title: "3. Les clients flashent le QR code !",
    text:
      "Les clients utilisent leur smartphone pour consulter la carte. Vous pouvez télécharger gratuitement le QR code, ou visiter notre boutique pour commander des supports personnalisés (chevalets, stickers, cartes de visites, flyers...).",
  },
];

const HowDoesItWork = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.HTitle}>
        <span className={classes.HTitleSpan}>C</span>omment ça marche{" "}
        <span className={classes.HTitleSpan}>?</span>
      </Typography>
      <div className={classes.explanations}>
        {steps.map((step) => (
          <div className={classes.stepSection}>
            <Typography className={classes.stepTitle} variant="body1">
              {step.title}
            </Typography>
            <img
              className={classes.stepImg}
              src={step.image}
              alt={step.title}
            />
            <Typography className={classes.stepText} variant="body2">
              {step.text}
            </Typography>
          </div>
        ))}
      </div>
      <NavLink to="./shop" className={classes.links}>
        <Button className={classes.shopButton}>BOUTIQUE</Button>
      </NavLink>
      <BackToTopButton />
    </div>
  );
};

export default compose(withStyles(styles))(HowDoesItWork);
