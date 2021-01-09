import { Button, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { compose } from "redux";
import ContactForm from "../forms/ContactForm";
import PHONE from "../../assets/icons/contactPhone.png";
import ADRESS from "../../assets/icons/contactAdress.png";
import FACEBOOK from "../../assets/icons/contactFacebook.png";
import LINKEDIN from "../../assets/icons/contactLinkedin.png";
import MAIL from "../../assets/icons/contactMail.png";
import BackToTopButton from "../UI kit/BackToTopButton";

const styles = (theme) => ({
  container: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {},
  },
  root: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10%",
      marginRight: "10%",
      display: "flex",
    },
  },
  contactTitle: {
    paddingTop: "2rem",
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem",
      marginBottom: "3rem",
      paddingTop: "4rem",
    },
  },
  titleSpan: {
    color: "#ee1c80",
  },
  textContainer: {
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "3rem",
    },
  },
  textIntro: {
    fontFamily: "Archivo narrow",
    fontWeight: 400,
    paddingBottom: "3rem",
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
    },
  },
  formContainer: {
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
      marginTop: "2rem",
      margin: "4rem",
    },
  },
  contactText: {
    fontFamily: "Archivo narrow",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
  },
  socialContact: {
    display: "flex",
    marginTop: "3rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "8rem",
    },
  },
  contactButton: {
    [theme.breakpoints.up("sm")]: {
      width: "4rem",
    },
  },
  contactIcons: {
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  mailIcon: {
    width: "15%",
  },
});

const ContactSection = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.contactTitle}>
        <span className={classes.titleSpan}>C</span>ontact
      </Typography>
      <div className={classes.root}>
        <div className={classes.textContainer}>
          <Typography className={classes.textIntro}>
            Contactez-nous pour toutes demandes d'informations, devis,
            prestations sur mesure :
          </Typography>
          <Typography className={classes.contactText}>
            Applications web/mobile
          </Typography>
          <Typography className={classes.contactText}>
            Réalisation de site vitrine
          </Typography>
          <Typography className={classes.contactText}>
            Click and collect
          </Typography>
          <Typography className={classes.contactText}> e-commerce</Typography>
          <Typography className={classes.contactText}>
            Référencement, SEO
          </Typography>

          <div className={classes.socialContact}>
            <Button className={classes.contactButton}>
              <img
                src={LINKEDIN}
                alt="link to linkedin"
                className={classes.contactIcons}
              />
            </Button>
            <Button className={classes.contactButton}>
              <img
                src={FACEBOOK}
                alt="link to facebook"
                className={classes.contactIcons}
              />
            </Button>
            <Button className={classes.contactButton}>
              <img
                src={PHONE}
                alt="phone icon"
                className={classes.contactIcons}
              />
            </Button>
            <Button className={classes.contactButton}>
              <img
                src={ADRESS}
                alt="adress icon"
                className={classes.contactIcons}
              />
            </Button>
          </div>
        </div>

        <div className={classes.formContainer}>
          <img src={MAIL} alt="mail icon" className={classes.mailIcon} />
          <ContactForm />
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default compose(withStyles(styles))(ContactSection);
