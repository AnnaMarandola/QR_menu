import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenu } from "../../store/actions/menuActions";
import AddNewDish from "./AddNewDish";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
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

const DishFormContainer = ({ classes, restaurant, menu }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {!open && (
        <div>
          <Button onClick={handleClickOpen}>
            <AddCircleOutlineTwoToneIcon /> Ajouter un plat
          </Button>
        </div>
      )}

      {open && (
        <div>
          <AddNewDish restaurant={restaurant} menu={menu} />
          <Button onClick={handleClose}>CLOSE</Button>
        </div>
      )}
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
)(DishFormContainer);
