import React from "react";
import { compose } from "redux";
import { Button, Typography, withStyles } from "@material-ui/core";
import HDIW1 from "../../assets/landingPage/HDIW1 (2).png";
import HDIW2 from "../../assets/landingPage/HDIW2 (2).png";
import HDIW3 from "../../assets/landingPage/HDIW3 (2).png";
import { NavLink } from "react-router-dom";
import BackToTopButton from "../UI kit/BackToTopButton";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingBottom: "0.5rem",
    paddingTop: "2rem",
    backgroundColor: "#fffff2",
    [theme.breakpoints.up("sm")]: {

    },
  },  
  HTitle: {
    marginTop: "2rem",
    marginBottom: "4rem",
    fontFamily: "Archivo narrow",
    fontSize: "2.5rem",
    fontWeight: 300,
    color: "#001730",
    [theme.breakpoints.up("sm")]: {
      marginTop: "4rem",
      fontSize: "4rem",
    },
  },
  HTitleSpan: {
    color: "#FE4A49",
  },

  stepSection: {
    marginBottom: "5rem",
    [theme.breakpoints.up("sm")]: {
      width: "30%"
    },
  },
  step: {
    backgroundColor: "#001730",
    borderRadius: "30px",
    paddingTop: "1rem",
    [theme.breakpoints.up("sm")]: {
      height: "22rem",
    },
  },
  explanations: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: "6rem",
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },

  stepImg: {
    width: "30%",
  },
  stepTitle: {
    fontSize: "1rem",
    width: "70%",
    marginLeft: "15%",
    marginBottom: "0.5rem",
    color: "#fffff2"
  },
  stepText: {
    width: "80%",
    marginTop: "1rem",
    marginLeft: "10%",
    textAlign: "justify",
    color: "#fffff2"
  },
  shopButton: {
    backgroundColor: "#FE4A49",
    color: "white",
    borderRadius: "30px",
    width: "60%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "2rem",
      width: "15%",
      height: "4rem",
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
        {steps.map((step, key) => (
          <div className={classes.stepSection} key={key}>
          <div className={classes.step}>
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
          </div>
        ))}
      </div>
      <NavLink to="./shop" className={classes.links}>
        <Button className={classes.shopButton}>BOUTIQUE QR CODE</Button>
      </NavLink>
      <BackToTopButton />
    </div>
  );
};

export default compose(withStyles(styles))(HowDoesItWork);
