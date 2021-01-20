import React, { useState } from "react";
import { Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenu } from "../../store/actions/menuActions";
import DesignForm from "../forms/DesignForm";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const styles = (theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  designButton: {
    color: theme.palette.primary.whiteish,
    backgroundColor: theme.palette.primary.red,
  },
  designTitle: {
    marginBottom: "1rem",
  },
});

const DesignFormContainer = ({ classes, restaurant, menu }) => {
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
          <Button onClick={handleClickOpen} className={classes.designButton}>
            <EditRoundedIcon style={{ fill: "white" }} /> Personnaliser le
            design
          </Button>
        </div>
      )}

      {open && (
        <div>
          <Typography variant="h2" className={classes.designTitle}>
            Personnalisation du design
          </Typography>
          <DesignForm restaurant={restaurant} menu={menu} />
          <Button onClick={handleClose}>X</Button>
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
)(DesignFormContainer);
