import React, { useState } from "react";
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
import EditRoundedIcon from '@material-ui/icons/EditRounded';


const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: "1rem",
  },
  dialogBox: {
    backgroundColor: "white"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "initial",
  },
  menuTitleEdit: {
    marginLeft: "80%"
  },
  formControl: {
    minWidth: 420,

  },
  input: {
    marginTop: "-2rem",
    minWidth: "60%",

  },
});

const TitleForm = ({ classes, restaurant, menu, auth, updateMenu }) => {
  console.log("restaurant in template form", restaurant);
  console.log("auth in template form", auth.uid);
  const menuId = menu && menu.id;
  console.log("menuId", menuId);

  const [menuTitle, setMenuTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setMenuTitle(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setTitle = (e) => {
    e.preventDefault();
    console.log("e", e);
    updateMenu({ menuId: menuId, title: menuTitle });
    console.log("menuTitle", menuTitle);
    handleClose()
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleClickOpen} className={menu && menu.title ? classes.menuTitleEdit : classes.menuTitle}>
      { menu && menu.title ? <EditRoundedIcon/> : "Donnez un titre à votre menu !"}
      </Button>
      <Dialog
        className={classes.dialogBox}
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Modifiez le titre</DialogTitle>

        <DialogContent className={classes.container}>
          <form className={classes.formControl} onSubmit={setTitle}>
            <TextField
              className={classes.input}
              id="title"
              label={
                !menu.title
                  ? "Nos salades, Nos grillades, Nos pizzas ..."
                  : menu.title
              }
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={setTitle}>Ok</Button>
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
  connect(mapStateToProps, { updateMenu }),
  firestoreConnect((props) => [
    {
      collection: "menus",
      storeAs: "menu",
      where: [["menu.restoId", "==", props.restaurant.id]],
    },
  ])
)(TitleForm);
