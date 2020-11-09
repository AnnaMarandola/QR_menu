import { Avatar, ListItemAvatar, Typography, Button } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = (theme) => ({
  root: {
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginTop: "1rem",
  },
  dishInfos: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.4rem"
  },
  dishTitle: {

  },
  dishPrice: {
  },
  editButtons: {
    // border: "solid 0.5px black"
  },

});

const DishItemEdit = ({
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
      <div className={classes.dishInfos}>
        <Typography className={classes.dishTitle} variant="body1">
          {title}
        </Typography>
        <Typography className={classes.dishPrice} variant="body1">
          {price}
        </Typography>
        <Typography variant="body2">{ingredients}</Typography>
        <Typography variant="body2">{description}</Typography>
      </div>
      
      <div className={classes.editButtons}>
        <Button>
          <EditRoundedIcon />
        </Button>
        <Button>
          <ArrowDropUpIcon />
        </Button>
        <Button>
          <ArrowDropDownIcon />
        </Button>
        <Button>
          <DeleteForeverIcon />
        </Button>
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(DishItemEdit);
