import { Avatar, ListItemAvatar, Typography } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({
  root: {
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginTop: "1rem",
  },
  dishTitle: {
    fontSize: "1.3rem",
    fontStyle: "italic",
  },
  allergenList: {
    display: "flex",
  },
 dishPrice: {
   display: "flex",
   justifyContent: "flex-end",
 },
 titleAllergenSection: {
   marginTop: "1rem",
 }
});

const DishItem = ({
  classes,
  title,
  price,
  ingredients,
  description,
  allergens,
}) => {
  return (
    <div className={classes.root}>
      <hr />
      <Typography className={classes.dishTitle} variant="body1">{title}</Typography>
      <Typography className={classes.dishPrice} variant="body1">{price}</Typography>
      <Typography variant="body2">{ingredients}</Typography>
      <Typography variant="body2">{description}</Typography>

      <Typography variant="body2" className={classes.titleAllergenSection}>allergènes signalés :</Typography>
      <div className={classes.allergenList}>

      {allergens.map((allergen, i) => 
      <ListItemAvatar key={i}>
        <Avatar
        alt={`${allergen}`}
        src={require(`../../assets/allergens/${allergen}.png`)}
        />
      </ListItemAvatar>
      )}
      </div>
      <hr />
    </div>
  );
};

export default compose(withStyles(styles))(DishItem);
