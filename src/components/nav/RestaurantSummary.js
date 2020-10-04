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

const styles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const RestaurantSummary = ({ restaurant, classes }) => {
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom variant="h5" >
            Votre établissement :
          </Typography>
          <CardMedia
            className={classes.media}
            image={restaurant.logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" >
              {restaurant.name}
            </Typography>
            <Typography variant="body1" >
              Adresse: {restaurant.adress}
            </Typography>
            <Typography variant="body1" >
              Ville: {restaurant.postalCode} {restaurant.city}
            </Typography>            
            <Typography variant="body1" >
              facebook: {restaurant.facebook} 
            </Typography>
            <Typography variant="body1" >
              instagram: {restaurant.instagram} 
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <NavLink to='/inforesto'>
          <Button size="small" color="primary">
            Modifier
          </Button>
          </NavLink>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(RestaurantSummary);
