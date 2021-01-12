import React, { useState } from "react";
import { Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenu } from "../../store/actions/menuActions";
import AddNewDish from "./AddNewDish";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import FormulaForm from "./FormulaForm";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2rem",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  addButton: {
    color: theme.palette.primary.whiteish,
    backgroundColor: theme.palette.primary.red,
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

const FormulaFormContainer = ({ classes, restaurant, menu }) => {
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
          <Button onClick={handleClickOpen} className={classes.addButton}>
            <AddCircleOutlineTwoToneIcon style={{ fill: "white" }} />Les formules
          </Button>
        </div>
      )}

      {open && (
        <div>
          <FormulaForm
            restaurant={restaurant}
            menu={menu}
            handleClose={handleClose}
          />
          <Button onClick={handleClose}>x</Button>
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
)(FormulaFormContainer);
