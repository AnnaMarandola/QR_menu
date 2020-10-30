import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Button, Card, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../store/actions/menuActions";

const styles = (theme) => ({
  root: {
    width: '95%',
    marginLeft: '2.5%',
    marginTop: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  titleSection: {
      marginTop: '1rem',
      marginLeft: '1rem',

  },
  input: {
     marginLeft: '1rem',
     marginRight: '1rem',
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    marginTop: '2rem',
    marginBottom: '1rem',
    marginLeft: '35%',
    width: '30%',
  },
});

const TitleForm = ({ classes, restaurant, menu, auth, updateMenu }) => {
  console.log("restaurant in template form", restaurant);
  console.log("auth in template form", auth.uid);
  const menuId = menu && menu.id;
  console.log('menuId', menuId)

  const [menuTitle, setMenuTitle] = useState("")

  const handleChange = (e) => {
    setMenuTitle( e.target.value);
  };


  const setTitle = (e) => {
    e.preventDefault();
    console.log("e", e)
    updateMenu({ menuId: menuId, title: menuTitle })
    console.log("menuTitle", menuTitle);

  };


  return (
    <div>
          <Card className={classes.root}>
          <Typography className={classes.titleSection} gutterBottom variant="h2">
              Donnez un titre à votre carte :
            </Typography>            
            <TextField
            className={classes.input}
              id="title"
              label={ !menu.title ? "Nos salades,  grillades, pizzas ..." : menu.title }
              onChange={handleChange}
            />
        <Button className={classes.addButton} onClick={setTitle}>{ !menu.title ? "valider" : "modifier" }</Button>
          </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0]
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {updateMenu}),
  firestoreConnect(props => [
    {
      collection: 'menus',
      storeAs: 'menu',
      where: [['menu.restoId', '==', props.restaurant.id]],
    }
  ])
)(TitleForm);
