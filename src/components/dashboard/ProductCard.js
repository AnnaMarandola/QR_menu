import React from "react";
import { Typography, CardContent, Card, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink } from "react-router-dom";
import CARD from "../../assets/products/La Petite escale2.png";
import FLYER from "../../assets/products/flyer.jpg";
import CHEVALET from "../../assets/products/chevalet.jpeg";
import MAGNET from "../../assets/products/magnets.jpg";
import QRCODE from "../../assets/products/logoIcon (1).png";

const styles = (theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
    [theme.breakpoints.up("md")]: {
      // minWidth: 300,
      // maxWidth: 300,
      // width: "100%",
    },
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "1.5rem",
    fontWeight: 400,
  },
  productPic: {
    width: "100%",
    marginBottom: "3rem",
  },
  buttonContainer: {},
  shopButton: {
    position: "relative",
    bottom: 0,
    backgroundColor: "#FE4A49",
    color: "white",
    width: "80%",
    marginLeft: "10%",
    borderRadius: "20px",
    margin: "2rem",
  },
  freeButton: {
    position: "relative",
    bottom: 0,
    backgroundColor: "white",
    color: "#FE4A49",
    border: "solid 1px #FE4A49",
    width: "80%",
    marginLeft: "10%",
    borderRadius: "20px",
    margin: "2rem",
  },
  status: {
    textAlign: "right",
    marginTop: "0.5rem",
  },
  links: {
    textDecoration: "none",
  },
});

const ProductCard = ({
  classes,
  name,
  buttonText,
  link,
  status,
  text2,
  restoId,
  menuId,
}) => {
  return (
    <Card className={classes.root}>
      <Typography className={classes.status}>{status}</Typography>

      {name && name !== "Mon QR code" && (
        <Typography gutterBottom className={classes.cardTitle}>
          {name}
        </Typography>
      )}
      <CardContent>
        {name && name === "Mon QR code" && (
          <img src={QRCODE} alt={name} className={classes.productPic} />
        )}
        {name && name === "Cartes de visite" && (
          <img src={CARD} alt={name} className={classes.productPic} />
        )}
        {name && name === "Chevalets de table" && (
          <img src={CHEVALET} alt={name} className={classes.productPic} />
        )}
        {name && name === "Magnets" && (
          <img src={MAGNET} alt={name} className={classes.productPic} />
        )}
        {name && name === "Flyers" && (
          <img src={FLYER} alt={name} className={classes.productPic} />
        )}
        {name && name === "Stickers" && (
          <img src={CARD} alt={name} className={classes.productPic} />
        )}
        <Typography className={classes.text2}>{text2}</Typography>
      </CardContent>
      {link && link === "qrcode" ? (
        <div>
          <NavLink
            className={classes.links}
            to={`/qrcode/${restoId}/${menuId}`}
          >
            <Button className={classes.shopButton}>{buttonText}</Button>
          </NavLink>
        </div>
      ) : (
        <div>
          {" "}
          <NavLink className={classes.links} to={`/shop`}>
            <Button className={name && name === "Mon QR code" ? classes.freeButton : classes.shopButton} >{buttonText}</Button>
          </NavLink>
        </div>
      )}
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
  connect(mapStateToProps, null)
)(ProductCard);
