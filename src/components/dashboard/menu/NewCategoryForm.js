import React, { useState } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateCategory } from "../../../store/actions/menuActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const styles = (theme) => ({
  rootCard: {
    marginBottom: "1rem",
    backgroundColor: "white",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#E81B7D",
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
    color: "#E81B7D",
    border: "solid 1px #e81b7d",
  },
});

const NewCategoryForm = ({ classes, menu, updateCategory }) => {
  const menuId = menu && menu.id;
  let categoriesData = menu && menu.newCategories;

  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);

  const [newCategories, setNewCategories] = useState(categoriesData || []);

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setCategory = (e) => {
    e.preventDefault();
    setNewCategories(newCategories.push(newCategory));
    updateCategory({ menuId: menuId, newCategories: newCategories });
    setNewCategory("");
    handleClose();
  };

  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
        Ajouter une nouvelle rubrique :
      </Typography>

      <div>
        {!open && (
          <div className={classes.titleSelected}>
            <Typography>{newCategory}</Typography>
            <Button onClick={handleClickOpen}>
              <EditRoundedIcon style={{ fill: "#E81B7D" }} />
            </Button>
          </div>
        )}

        {open && (
          <div>
            <form className={classes.titleform} onSubmit={setCategory}>
              <TextField
                className={classes.titleInput}
                defaultValue={newCategory}
                id="newCategory"
                onChange={handleChange}
              />
              <Button className={classes.submitButton} onClick={setCategory}>
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
  connect(mapStateToProps, { updateCategory })
)(NewCategoryForm);
