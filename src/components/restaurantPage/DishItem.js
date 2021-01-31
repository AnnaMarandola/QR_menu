import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ListItemAvatar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "white",
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
  },
  media: {
    height: 170,
  },
});

const DishItem = ({
  classes,
  title,
  price,
  ingredients,
  description,
  allergens,
  picture,
}) => {
  return (
    <Card className={classes.root}>
      { picture && <CardMedia
        className={classes.media}
        image={picture}
        title={title}
        component="img"
      />
      }
      <CardContent>
        <Typography className={classes.dishTitle} variant="body1">
          {title}
        </Typography>
        <Typography className={classes.dishPrice} variant="body1">
          {price} €
        </Typography>
        <Typography variant="body2">{ingredients}</Typography>
        <Typography variant="body2">{description}</Typography>

        <Typography variant="body2" className={classes.titleAllergenSection}>
          allergènes signalés :
        </Typography>
        <div className={classes.allergenList}>
          {allergens.map((allergen, i) => (
            <ListItemAvatar key={i}>
              <Tooltip
                title={`${allergen}`}
                aria-label={`${allergen}`}
                enterTouchDelay={700}
              >
                <Avatar
                  alt={`${allergen}`}
                  src={require(`../../assets/allergens/${allergen}.png`)}
                />
              </Tooltip>
            </ListItemAvatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default compose(withStyles(styles))(DishItem);
