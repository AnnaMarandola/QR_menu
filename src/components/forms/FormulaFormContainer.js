import React, { useState } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenu } from "../../store/actions/menuActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FormulaForm from "./FormulaForm";

const styles = (theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "white",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    fontWeight: 400,
  },
  titleContainer: {
    paddingTop: "1rem",
    paddingLeft: "1rem",
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
  editIcon: {
    fill: "#f5564e",
    marginBottom: "1rem",
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
    <Card className={classes.root}>
      {!open && (
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>Les formules : </Typography>
          <Button onClick={handleClickOpen} className={classes.editButton}>
            <EditRoundedIcon className={classes.editIcon} />
          </Button>
        </div>
      )}

      {open && (
        <Card>
          <FormulaForm
            restaurant={restaurant}
            menu={menu}
            handleClose={handleClose}
          />
        </Card>
      )}
      {/* <div className={classes.formulaContainer}>
        <div className={classes.formula}>
          <div className={classes.formulaAndPrice}>
            <Typography>{menu.formula1}</Typography>
            <Typography>
              {menu.formula1Price} {menu.formula1Price ? "€" : null}
            </Typography>
          </div>
          <Typography className={classes.comment}>
            {menu.formula1Comment}
          </Typography>
        </div>
        <div className={classes.formula}>
          <div className={classes.formulaAndPrice}>
            <Typography>{menu.formula2}</Typography>
            <Typography>
              {menu.formula2Price} {menu.formula2Price ? "€" : null}
            </Typography>
          </div>
          <Typography className={classes.comment}>
            {menu.formula2Comment}
          </Typography>
        </div>
      </div> */}
    </Card>
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
