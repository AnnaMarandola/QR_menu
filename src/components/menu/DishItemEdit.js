import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteDish } from "../../store/actions/dishActions";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddNewDish from "../forms/AddNewDish";

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
    padding: "0.4rem",
  },
  dishTitle: {},
  dishPrice: {},
  editButtons: {},
});

const DishItemEdit = ({ classes, dish, deleteDish }) => {

  const [edited, setEdited] = useState(false);

  const handleDelete = (e) => {
    console.log("e", e);
    deleteDish(dish.id);
    console.log("dish deleted !");
  };

  const handleOpen = (e) => {
    setEdited(true);
  };

  const handleClose = (e) => {
    setEdited(false);
  };

  return (
    <div className={classes.root}>
      <hr />
      <div className={classes.dishInfos}>
        <Typography className={classes.dishTitle} variant="body1">
          {dish.dishName}
        </Typography>
        <Typography className={classes.dishPrice} variant="body1">
          {dish.price}
        </Typography>
      </div>

      <div className={classes.editButtons}>
        <Button onClick={handleOpen}>
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
        {edited && 
        <div>
        <AddNewDish restaurant={dish.restoId} menu={dish.menuId} dish={dish} />
        <Button onClick={handleClose} >X</Button>
        </div>
        }
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(DishItemEdit);
