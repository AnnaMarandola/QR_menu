import React, { useState } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../../store/actions/menuActions";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import AddNewDish from "./AddNewDish";


const styles = (theme) => ({
  rootCard: {
    marginBottom: "1rem",
    backgroundColor: "white",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    fontWeight: 400,
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  exitButton: {
    margin: "1rem",
    backgroundColor: "#f5564e",
    // border: "solid 1px #f5564e",
    width: "2rem",
  },
});

const NewDishContainer = ({ classes, restaurant, menu }) => {

  const [open, setOpen] = useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
        Ajouter un plat :
      </Typography>

      <div>
        {!open && (
          <div className={classes.addButton}>
            <Button onClick={handleClickOpen}>
            <AddCircleOutlineTwoToneIcon style={{ fill: "#f5564e" }} />
            </Button>
          </div>
        )}

        {open && (
            <div>
          <AddNewDish restaurant={restaurant} menu={menu} handleClose={handleClose}/>
      <Button onClick={handleClose} className={classes.exitButton}>quitter</Button>
      </div>
        )}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
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
)(NewDishContainer);
