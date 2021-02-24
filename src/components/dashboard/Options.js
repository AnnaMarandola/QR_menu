import React, {useState} from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  Card, FormLabel,FormControl,FormGroup,FormControlLabel, FormHelperText, Switch,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 345,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 400,
    color: "#E81B7D",
  },
  media: {
    height: 140,
  },
  modifyButton: {
    border: "solid 1px #e81b7d",
    margin: "0.4rem",
    padding: "0.4rem",
    fontFamily: "Archivo narrow",
  },
  modifyIcon: {
    marginRight: "0.3rem",
    fill: "#E81B7D",
  },
  links: {
    textDecoration: "none",
  },
});



const Options = ({ restaurant, classes }) => {
    const [options, setOptions] = useState({
        carousel: true,
        dishPic: true,
        contactForm: true,
        googleMaps: true,
        translation: false,
      });

    const handleChange = (event) => {
        setOptions({ ...options, [event.target.name]: event.target.checked });
      };

  return (
        <Card className={classes.root}>
          <CardActionArea>
            <Typography gutterBottom className={classes.cardTitle}>
              Mes options
            </Typography>
            <CardContent>
            <FormControl component="fieldset">
      {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={options.carousel} onChange={handleChange} name="carousel" />}
          label="Gallerie d'images du restaurant"
        />
        <FormControlLabel
          control={<Switch checked={options.dishPic} onChange={handleChange} name="dishPic" />}
          label="Photo des plats"
        />
        <FormControlLabel
          control={<Switch checked={options.contactForm} onChange={handleChange} name="contactForm" />}
          label="Formulaire de contact"
        />
                <FormControlLabel
          control={<Switch checked={options.googleMaps} onChange={handleChange} name="googleMaps" />}
          label="Google maps"
        />          
        <FormControlLabel
          control={<Switch checked={options.translation} name="translation" />}
          label="Traduction multilingue"
        />
      <FormHelperText>Disponible prochainement</FormHelperText>
      </FormGroup>
    </FormControl>
            </CardContent>
          </CardActionArea>
        </Card>
  )
};

export default withStyles(styles)(Options);
