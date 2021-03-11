import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  Button,
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import UploadLogo from "../forms/UploadLogo";
import EditRoundedIcon from "@material-ui/icons/EditRounded";


const styles = (theme) => ({
  root: {
    minWidth: 325,
    maxWidth: 325,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
    [theme.breakpoints.up("md")]: {
      minWidth: 500,
      maxWidth: 500,
    },
  },
  cardContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-evenly"
    },
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 400,
    color: "#001730",
  },
  modifyButton: {
    border: "solid 2px #FE4A49",
    width: "80%",
    marginLeft: "10%",
    margin: "1rem",
    padding: "0.4rem",
    fontFamily: "Archivo narrow",
    color: "#FE4A49",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginLeft: "25%",
    },
  },
  modifyIcon: {
    marginRight: "0.3rem",
    fill: "#FE4A49",
  },
  links: {
    textDecoration: "none",
  },
});

const RestaurantSummary = ({ restaurant, classes }) => {
  return (
    <div>
      {restaurant ? (
        <Card className={classes.root}>
          <CardActionArea>
            <Typography gutterBottom className={classes.cardTitle}>
              Mon établissement
            </Typography>
            <CardContent className={classes.cardContainer}>
          <div className={classes.uploadSection}>
            <UploadLogo restaurant={restaurant} />
            </div>
            <div className={classes.summarySection}>
              <Typography gutterBottom variant="h5">
                {restaurant.name}
              </Typography>
              <Typography variant="body1">
                Adresse: {restaurant.adress}
              </Typography>
              <Typography variant="body1">
                Ville: {restaurant.postalCode} {restaurant.city}
              </Typography>
              <Typography variant="body1">
                facebook: {restaurant.facebook}
              </Typography>
              <Typography variant="body1">
                instagram: {restaurant.instagram}
              </Typography>
            </div>
            </CardContent>
          </CardActionArea>
            <NavLink
              className={classes.links}
              to={`/inforesto/edit/${restaurant.id}`}
            >
              <Button className={classes.modifyButton}>
                <EditRoundedIcon className={classes.modifyIcon} />
                Modifier
              </Button>
            </NavLink>
        </Card>
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Mon restaurant
            </Typography>{" "}
            <Typography gutterBottom variant="body2">
              Ces informations seront utilisées pour personnaliser votre carte
              en ligne .
            </Typography>
          </CardContent>
            <NavLink className={classes.links} to="/inforesto">
              <Button className={classes.modifyButton}>Modifier</Button>
            </NavLink>
        </Card>
      )}
    </div>
  );
};

export default withStyles(styles)(RestaurantSummary);
