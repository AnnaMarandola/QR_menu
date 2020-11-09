import React, { useState, useEffect} from "react";
import { withStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../store/actions/menuActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddNewDish from "./AddNewDish";
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2rem",
    display: "flex",
    justifyContent : "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "initial",
  },
  formControl: {
    minWidth: 320,
  },
  input: {
    marginTop: "-2rem",
    minWidth: "60%",
  },
});

const NewDishContainer = ({ classes, restaurant, menu, dishes }) => {

  console.log("restaurant in DISHACCORDION", restaurant);
  console.log("menu in DISHACCORDION", menu);
  console.log("dishes in DISHACCORDION", dishes);
  let dLength = dishes && dishes.length
  console.log("dishesLength in DISHACCORDION", dLength);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <Button onClick={handleClickOpen}>

      <AddCircleOutlineTwoToneIcon/> Ajouter un plat
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Nouveau plat</DialogTitle>

        <DialogContent className={classes.container}>
          <AddNewDish close={handleClose} menu={menu} dishes={dishes} onClose={handleClose} />
        </DialogContent>
       
        <DialogActions>
          <Button onClick={handleClose}>X</Button>
        </DialogActions>

      </Dialog>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { updateMenu })
  // firestoreConnect((props) => [
  //   {
  //     collection: "menus",
  //     storeAs: "menu",
  //     where: [["menu.restoId", "==", props.restaurant.id]],
  //   },
  // ])
)(NewDishContainer);
