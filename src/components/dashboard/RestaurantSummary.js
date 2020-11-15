import React from "react";
import {
  Typography,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import UploadLogo from "../forms/UploadLogo";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    marginTop: "1rem",
    backgroundColor: "white",
  },
  media: {
    height: 140,
  },
  modifyButton: {
    backgroundColor: theme.palette.primary.orange,
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
  },
  links: {
    textDecoration: "none",
  },
});

const RestaurantSummary = ({ restaurant, classes }) => {
  console.log("restaurant summary", restaurant);
  return (
    <div>
      {restaurant ? (
        <Card className={classes.root}>
          <CardActionArea>
            <Typography gutterBottom variant="h5">
              Mon établissement :
            </Typography>
            <UploadLogo restaurant={restaurant}/>
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
            <NavLink className={classes.links} to={`/inforesto/edit/${restaurant.id}`}>
              <Button className={classes.modifyButton}>Modifier</Button>
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
              Ces informations seront utilisées pour personnaliser votre carte en ligne . 
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
