import React, { useState } from "react";
import { Card, Fab, Typography, withStyles } from "@material-ui/core";
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
    width: "95%",
    marginLeft: "2.5%",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#001730",
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
  editButton: {
    backgroundColor: "#fffff2",
  },
  editIcon: {
    fill: "#df4937",
  },
  exitButton: {
    margin: "1rem",
    fill: "#001730",
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
            <Fab size="small" onClick={handleClickOpen} className={classes.editButton}>
            <AddCircleOutlineTwoToneIcon className={classes.editIcon} />
            </Fab>
          </div>
        )}
        {open && (
            <div>
          <AddNewDish restaurant={restaurant} menu={menu} handleClose={handleClose}/>
      <Fab size="small" onClick={handleClose} className={classes.exitButton}>x</Fab>
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
