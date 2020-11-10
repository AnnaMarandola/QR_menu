import React from "react";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteDish } from "../../store/actions/dishActions";

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
  },

});

const DishItemEdit = ({
  classes,
  title,
  price,
  ingredients,
  description,
  id,
  deleteDish,
}) => {

  const handleDelete = (e) => {
    console.log("e", e);
    deleteDish(id);
    console.log("dish deleted !");
  }

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
        <Button onClick={handleDelete}>
          <DeleteForeverIcon />
        </Button>
      </div>
      <hr />

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDish: (dishId) => dispatch(deleteDish(dishId)),
  };
};


export default compose(withStyles(styles),
connect(mapStateToProps, mapDispatchToProps),
)(DishItemEdit);
