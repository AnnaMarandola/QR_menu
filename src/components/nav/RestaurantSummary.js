import React from "react";
import { Typography } from "@material-ui/core";

const RestaurantSummary = ({ restaurant }) => {
  return (
    <div>
      <Typography variant="h1">Votre établissement :</Typography>
      <Typography variant="body1">nom : {restaurant.name}</Typography>
      <Typography variant="body1">adresse : {restaurant.adress}</Typography>
      <Typography variant="body1">ville : {restaurant.city}</Typography>
    </div>
  );
};

export default RestaurantSummary;
