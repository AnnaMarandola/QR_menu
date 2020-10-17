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
    marginLeft: '2.5%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    width: '90%'
  }

});


const MenuFormPage = ({classes}) => {
  return (
    <div className={classes.root}>
        <Typography variant="h1">Votre carte</Typography>
        <Accordion>
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
      <Button>ajouter à mon menu</Button>
      </form>
      </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default withStyles(styles)(MenuFormPage);
