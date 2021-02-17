import React, { useState } from "react";
import { Typography, Button, Card, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteDish, switchStatus } from "../../../store/actions/dishActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddNewDish from "./AddNewDish";
import Switch from "@material-ui/core/Switch";
import { toast } from "react-toastify";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "yellow",
    padding: 0,
  },
  dishInfos: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "white",
  },
  dishTitle: {},
  dishPrice: {},
  editButtons: {
    backgroundColor: "white",
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
    });
  };

  const handleOpen = (e) => {
    setEdited(true);
  };

  const handleClose = (e) => {
    setEdited(false);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.dishInfos}>
        <Typography className={classes.dishTitle} variant="body1">
          {dish.dishName}
        </Typography>
        <Typography className={classes.dishPrice} variant="body1">
          {dish.price} €
        </Typography>
      </div>

      <div className={classes.editButtons}>
        <Switch
          size="small"
          checked={isPublished}
          value={isPublished}
          onChange={handleChange}
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Button onClick={handleOpen}>
          <EditRoundedIcon />
        </Button>

        <Button onClick={handleOpen}>
          <AddPhotoAlternateIcon />
        </Button>
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
        {/* <UploadDishPic dish={dish}/> */}
      </div>
      {/* <hr /> */}
    </Card>
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
