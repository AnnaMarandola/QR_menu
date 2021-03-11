import React from "react";
import {
  Typography,
  CardContent,
  Card,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import ProductCard from "./ProductCard";

const styles = (theme) => ({
  root: {
    minWidth: 325,
    maxWidth: 325,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
    marginBottom: "4rem",
    [theme.breakpoints.up("md")]: {
        minWidth: 600,
        maxWidth: 1400,
      },
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 400,
    color: "#001730",
  },
  cardContent: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      width: "80%",
      marginLeft: "10%",
  },
  sailingTextContainer: {
    marginTop: "5rem",
  },
  sailingText: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontFamily: "Archivo narrow",
    margin: "1rem",
    fontWeight: 400,
  },
  devisButton: {
    width: "60%",
    marginLeft: "20%",
    marginTop: "4rem",
    marginBottom: "4rem",
    padding: "1.2rem",
    backgroundColor: "#FE4A49",
    color: "white",
    [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
        width: "40%",
        marginLeft: "30%",
      },
  },
});

const products = [
    {
        id: 1,
        name: "Mon QR code",
        text2: "Téléchargez gratuitement votre qr code au format .PDF",
        button: "Mon QR code",
        link: "qrcode",

    },
    {
        id: 2,
        name: "Cartes de visite",
        button: "Découvrir l'offre",
        link: "/shop",
        text2: "Livraison gratuite en france métropolitaine",
        status: "disponible prochainement"
    },
    {
        id: 3,
        name: "Chevalets de table",
        button: "Découvrir l'offre",
        link: "/shop",
        text2: "Livraison gratuite en france métropolitaine",
        status: "disponible prochainement",

    },
    {
        id: 4,
        name: "Magnets",
        button: "Découvrir l'offre",
        link: "/shop",
        text2: "Livraison gratuite en france métropolitaine",
        status: "disponible prochainement",

    },
    {
        id: 5,
        name: "Flyers",
        button: "Découvrir l'offre",
        link: "/shop",
        text2: "Livraison gratuite en france métropolitaine",
        status: "disponible prochainement",

    },
    {
        id: 6,
        name: "Stickers",
        button: "Découvrir l'offre",
        link: "/shop",
        text2: "Livraison gratuite en france métropolitaine",
        status: "disponible prochainement",

    },
]

const QrCodeSailingCard = ({ classes, restoId, menuId }) => {


  return (
    <Card className={classes.root}>
        <Typography gutterBottom className={classes.cardTitle}>
          Mon QrCode
        </Typography>
        <CardContent className={classes.cardContent}>
        {products.map((product, id) => (
        <ProductCard
        key={id}
        name={product.name}
        buttonText={product.button}
        link={product.link}
        text2={product.text2}
        status={product.status}
        restoId={restoId}
        menuId={menuId}
        />
        ))}
        </CardContent>
        <div className={classes.sailingTextContainer}>
        <Typography className={classes.sailingText}> Nous réalisons des designs de qualité professionnelle pour vos supports marketing.</Typography>
        <Typography className={classes.sailingText}> Les impressions sont réalisées en France par notre partenaire Print'O'Clock, labellisé Imprim'Vert .</Typography>
        <Typography className={classes.sailingText}> Livraison gratuite !</Typography>
        </div>
        <Button className={classes.devisButton}>Demander un devis</Button>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null),
)(QrCodeSailingCard);
