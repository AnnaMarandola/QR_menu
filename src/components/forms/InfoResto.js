import React from 'react'
import { withStyles } from '@material-ui/core'
import { Typography, TextField, Button } from "@material-ui/core";
import Navbar from '../nav/Navbar';

const styles = (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "90%",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      width: "90%",
      marginLeft: "5%",
    },
    validationButton: {
      marginTop: "2rem",
      position: "right",
      backgroundColor: theme.palette.primary.red,
      color: theme.palette.primary.whiteish,
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "3rem",
    },
  });
  


const InfoResto = ({ classes }) => {
return(
    <div className={classes.root}>
    <Navbar/>
    <form  className={classes.form}>
    <Typography variant="h1">Informations sur votre établissement</Typography>
    <Typography variant="body1">Ces informations seront disponibles sur votre page. </Typography>

      <div className={classes.inputs}>
        <TextField id="restoname" label="nom de l'établisement"  />
        <TextField
          id="adress"
          label="adresse"
        />
        <TextField id="city" label="ville"  />
        <TextField
          id="postcode"
          label="code postal"
        />
        <TextField id="phone" label="numéro de téléphone"  />
        <TextField id="file" label="votre logo"  />
        <TextField id="instagram" label="votre instagram"  />
        <TextField id="facebook" label="votre facebook"  />

      </div>

      <div className={classes.buttonsContainer}>
        <Button variant="contained" className={classes.validationButton}>
          valider
        </Button>
      </div>
    </form>
  </div>

)
}

export default withStyles(styles)(InfoResto)