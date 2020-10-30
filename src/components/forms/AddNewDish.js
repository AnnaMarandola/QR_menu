import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import AllergenList from "./AllergenList";
import { withStyles } from "@material-ui/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const styles = (theme) => ({
  root: {
    width: '95%',
    marginLeft: '2.5%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  input: {
    width: '90%',
  },
  accordion: {
    backgroundColor: 'white',
  },  
  heading: {
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    marginTop: '1rem',
  },


});


const AddNewDish = ({classes, restaurant}) => {
    console.log("restaurant in AddNewDish", restaurant )
  return (
    <div className={classes.root}>
        <Accordion className={classes.accordion}
>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>ajouter un plat</Typography>
        </AccordionSummary>
        <AccordionDetails>

      <form className={classes.form}>
          <TextField className={classes.input} id="name" label="nom du plat" />
          <TextField className={classes.input} id="ingredients" label="ingredients" />
          <TextField className={classes.input} id="description" label="description" />
          <AllergenList />
          <TextField className={classes.input} id="price" label="prix" />
      <Button className={classes.addButton}>ajouter à mon menu</Button>
      </form>
      </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default withStyles(styles)(AddNewDish);
