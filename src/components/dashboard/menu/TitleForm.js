import React, { useState } from "react";
import { Card, Fab, Typography, withStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../../store/actions/menuActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

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
  titleSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  titleForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleInput: {
    width: "60%",
    marginLeft: "1rem",
    marginTop: "1rem",
  },
  submitButton: {
    margin: "1rem",
    color: "#f5564e",
    border: "solid 1px #f5564e",
  },
  editButton: {
    backgroundColor: "#fffff2",
  },
  editIcon: {
    fill: "#df4937",
  },
});

const TitleForm = ({ classes, restaurant, menu, updateMenu }) => {
  const menuId = menu && menu.id;
  const title = menu && menu.title;

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
    handleClose();
  };

  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
        Titre de mon menu :
      </Typography>

      <div>
        {!open && (
          <div className={classes.titleSelected}>
            <Typography>{title}</Typography>
            <Fab size="small" onClick={handleClickOpen} className={classes.editButton}>
              <EditRoundedIcon className={classes.editIcon} />
            </Fab>
          </div>
        )}

        {open && (
          <div>
            <form className={classes.titleform} onSubmit={setTitle}>
              <TextField
                className={classes.titleInput}
                defaultValue={title}
                id="title"
                onChange={handleChange}
              />
              <Button className={classes.submitButton} onClick={setTitle}>
                valider
              </Button>
            </form>
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
)(TitleForm);
