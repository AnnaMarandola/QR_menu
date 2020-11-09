import React, { useState } from "react";
import { AccordionActions, withStyles } from "@material-ui/core";
import { Typography, Button, Card, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateMenu } from "../../store/actions/menuActions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const styles = (theme) => ({
  root: {
    width: '95%',
    marginLeft: '2.5%',
    marginTop: '2rem',
  },
  accordion: {
    backgroundColor: 'white',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',

  },
  input: {
    marginTop: "-2rem",
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
    <div className={classes.root}>
          <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography className={classes.heading} gutterBottom variant="h2">
             { menuTitle.length != 0 ? "Donnez un titre à votre carte" : "modifier le titre" }
            </Typography>            
          </AccordionSummary>
          <AccordionDetails className={classes.content}>
            <TextField
            className={classes.input}
              id="title"
              label={ !menu.title ? "Nos salades, Nos grillades, Nos pizzas ..." : menu.title }
              onChange={handleChange}
            />
            <AccordionActions>     
            <Button className={classes.addButton} onClick={setTitle}>valider</Button>
            </AccordionActions>
        </AccordionDetails>
              </Accordion>

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
