import React from "react";
import {
  Typography,
  CardActionArea,
  CardActions,
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
    minWidth: 345,
    maxWidth: 345,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 400,
    color: "#E81B7D",
  },
  media: {
    height: 140,
  },
  modifyButton: {
    border: "solid 1px #e81b7d",
    margin: "0.4rem",
    padding: "0.4rem",
    fontFamily: "Archivo narrow",
  },
  modifyIcon: {
    marginRight: "0.3rem",
    fill: "#E81B7D",
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
            <UploadLogo restaurant={restaurant} />
            <CardContent>
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
            </CardContent>
          </CardActionArea>
          <CardActions>
            <NavLink
              className={classes.links}
              to={`/inforesto/edit/${restaurant.id}`}
            >
              <Button className={classes.modifyButton}>
                <EditRoundedIcon className={classes.modifyIcon} />
                Modifier
              </Button>
            </NavLink>
          </CardActions>
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
            <NavLink className={classes.links} to="/inforesto">
              <Button className={classes.modifyButton}>Modifier</Button>
            </NavLink>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default withStyles(styles)(RestaurantSummary);
