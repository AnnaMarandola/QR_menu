import React from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import UploadCarouselImg from "./UploadCarouselImg";
import Gallery from "./Gallery";

const styles = (theme) => ({
  rootCard: {
    minWidth: 345,
    maxWidth: 345,
    padding: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "white",
    height: "fit-content",
    [theme.breakpoints.up("md")]: {
      minWidth: 345,
      maxWidth: 600,
    },
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    fontWeight: 400,
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
});

const GalleryCard = ({ classes, restaurant }) => {
  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
        Ajouter une gallerie d'images :
      </Typography>
      <div className={classes.uploadButton}>
        <UploadCarouselImg restaurant={restaurant} />
      </div>
      <Gallery restaurant={restaurant} />
    </Card>
  );
};

export default compose(withStyles(styles))(GalleryCard);
