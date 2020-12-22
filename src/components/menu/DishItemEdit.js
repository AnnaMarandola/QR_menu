import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteDish, switchStatus } from "../../store/actions/dishActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddNewDish from "../forms/AddNewDish";
import Switch from "@material-ui/core/Switch";
import { toast } from "react-toastify";


const styles = (theme) => ({
  root: {
    width: "100%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginTop: "1rem",
  },
  dishInfos: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.4rem",
    backgroundColor: "white"
  },
  dishTitle: {},
  dishPrice: {},
  editButtons: {
    backgroundColor: "white"

  },
});

const DishItemEdit = ({ classes, dish, deleteDish, switchStatus }) => {
  const [edited, setEdited] = useState(false);
  const [isPublished, setPublished] = useState(dish.published);

  const handleChange = (event) => {
    let status = event.target.checked;
    setPublished(status);
    switchStatus({ dishId: dish.id, status: status });
  };

  const handleDelete = (e) => {
    console.log("e", e);
    deleteDish(dish.id);
    toast.warning("Plat supprimé !", {
      position: toast.POSITION.TOP_LEFT,
    })
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
        <Switch
          size="small"
          checked={isPublished}
          value={isPublished}
          onChange={handleChange}
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Button onClick={handleDelete}>
          <DeleteForeverIcon />
        </Button>
        {edited && (
          <div>
            <AddNewDish
              restaurant={dish.restoId}
              menu={dish.menuId}
              dish={dish}
            />
            <Button onClick={handleClose}>X</Button>
          </div>
        )}
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
    switchStatus: (menuId, status) => dispatch(switchStatus(menuId, status)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(DishItemEdit);
