import React from "react";
import { compose } from "redux";
import { Button, Typography, withStyles } from "@material-ui/core";
import MARKETING from "../../assets/landingPage/marketing.png";
import ALLERGENS from "../../assets/landingPage/allergens-smartphone.png";
import COVID from "../../assets/landingPage/covid.png";
import CHECKED from "../../assets/landingPage/checked.png";
import { NavLink } from "react-router-dom";
import BackToTopButton from "../UI kit/BackToTopButton";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "0.5rem",    
    backgroundColor: "#fbe998",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
      width: "80%",
      marginLeft: "10%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginBottom: "5rem",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
  textAndImgOdd: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row-reverse",
    },
  },
  textAndImgEven: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  CTitle: {
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
  CTitleSpan: {
    color: "#ee1c80",
  },
  commitImg: {
    width: "60%",
    [theme.breakpoints.up("sm")]: {
      width: "25%",
    },
  },
  titleContainer: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginLeft: "10%",
    },
  },
  checkedIcon: {
    width: "10%",
    [theme.breakpoints.up("sm")]: {
      width: "6%",
      height: "6%",
    },
  },
  commitTitle: {
    width: "70%",
    marginLeft: "15%",
    marginBottom: "0.5rem",
    fontFamily: "Archivo narrow",
    fontSize: "1.5rem",
    color: "#ee1c80",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7rem",
      marginLeft: "-10%",
      marginTop: "0.5rem",
    },
  },
  commitText: {
    width: "80%",
    marginTop: "1rem",
    marginLeft: "10%",
    textAlign: "justify",
  },
  links: {
    textDecoration: "none",
  },
  showButton: {
    marginTop: "2rem",
    backgroundColor: "#ee1c80",
    color: "white",
    [theme.breakpoints.up("sm")]: {

    }
  },
});

const commitments = [
  {
    id: 1,
    image: MARKETING,
    title: "Communication et référencement",
    firstParagraph:
      "Mettez en avant votre menu en le partageant sur vos réseaux sociaux, plateformes de référencement, site internet...",
    secondParagraph:
      "Le QR code généré est aussi un formidable outil de communication que vous pourrez intégrer à vos campagnes marketing (flyers, cartes de visite, stickers, magnets ...)",
  },
  {
    id: 2,
    image: ALLERGENS,
    title: "Affichage des allergènes",
    firstParagraph:
      "L'application permet de signaler  les allergènes présents dans chaque plat et de se mettre ainsi en conformité avec la législation ( règlement n°1169/2011 ...)",
    secondParagraph: "Le saviez-vous?",
    thirdParagraph:
      "Plus de 30% des consommateurs français souffrent d'allergies alimentaires, d'intolérances ou suivent des diètes spécifiques ( régime sans gluten, végan ... ). Pour ces potentiels clients, l'accès aux informations sur les allergènes est un critère déterminant dans leur choix de restauration... alors pourquoi ne pas s'adresser directement à eux ?",
    button: "en savoir +",
  },
  {
    id: 3,
    image: COVID,
    title: "Respect des gestes barrières",
    firstParagraph:
      "L'utilisation du QR code permet à vos clients d'utiliser leur smartphone pour consulter la carte, et limite ainsi les zones de contaminations. Les clients peuvent également s'enregistrer sur le registre de présence.",
  },
];

const Commitments = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.CTitle}>
        <span className={classes.CTitleSpan}>Pourquoi</span> utiliser
        l'application <span className={classes.CTitleSpan}>QR</span>Menu{" "}
        <span className={classes.CTitleSpan}>?</span>
      </Typography>
      {commitments.map((commitment) => (
        <div className={classes.container}>
          <div className={
            commitment.id % 2 === 0
              ? classes.textAndImgOdd
              : classes.textAndImgEven
          }>
            <img
              className={classes.commitImg}
              src={commitment.image}
              alt={commitment.title}
            />
            <div className={classes.text}>
              <div className={classes.titleContainer}>
                <img
                  src={CHECKED}
                  alt="checked icon"
                  className={classes.checkedIcon}
                />
                <Typography className={classes.commitTitle} variant="body1">
                  {commitment.title}
                </Typography>
              </div>

              <Typography className={classes.commitText} variant="body2">
                {commitment.firstParagraph}
              </Typography>
              <Typography className={classes.commitText} variant="body2">
                {commitment.secondParagraph}
              </Typography>
              <Typography className={classes.commitText} variant="body2">
                {commitment.thirdParagraph}
              </Typography>
            </div>
          </div>
          <div>
            {commitment && commitment.button && (
              <NavLink to="./project" className={classes.links}>
              <Button className={classes.showButton}>
                {commitment.button}
              </Button>
              </NavLink>
            )}
          </div>
        </div>
      ))}
      <BackToTopButton />
    </div>
  );
};

export default compose(withStyles(styles))(Commitments);
