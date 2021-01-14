import React, { useState } from "react";
import { Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenu } from "../../store/actions/menuActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FormulaForm from "./FormulaForm";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "1.5rem",
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
        <div className={classes.titleContainer}>
        <Typography className={classes.title}>Les formules</Typography>
          <Button onClick={handleClickOpen} className={classes.editButton}>
            <EditRoundedIcon style={{ fill: "grey" }} />
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
