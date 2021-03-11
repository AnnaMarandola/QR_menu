import React, { useState } from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  Card,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { updateOptions } from "../../store/actions/restaurantActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const styles = (theme) => ({
  root: {
    minWidth: 325,
    maxWidth: 325,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "white",
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 400,
    color: "#001730",
  },
  media: {
    height: 140,
  },
  modifyButton: {
    border: "solid 1px #f5564e",
    margin: "0.4rem",
    padding: "0.4rem",
    fontFamily: "Archivo narrow",
  },
  modifyIcon: {
    marginRight: "0.3rem",
    fill: "#f5564e",
  },
  links: {
    textDecoration: "none",
  },
});

const Options = ({ restaurant, classes, updateOptions }) => {
  const [options, setOptions] = useState({
    carousel: restaurant && restaurant.options.carousel,
    dishPic: restaurant && restaurant.options.dishPic,
    contactForm: restaurant && restaurant.options.contactForm,
    googleMaps: restaurant && restaurant.options.googleMaps,
    translation: restaurant && restaurant.options.translation,
  });


  const handleChange = (event) => {
    let newOptions = (prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    });
    setOptions(newOptions);
    updateOptions({ restoId: restaurant.id, options: options });
  };

  console.log("options", options);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Typography gutterBottom className={classes.cardTitle}>
          Mes options
        </Typography>
        <CardContent>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={options.carousel}
                    value={options.carousel}
                    onChange={handleChange}
                    name="carousel"
                  />
                }
                label="Gallerie d'images du restaurant"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={options.dishPic}
                    value={options.dishPic}
                    onChange={handleChange}
                    name="dishPic"
                  />
                }
                label="Photo des plats"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={options.contactForm}
                    value={options.contactForm}
                    onChange={handleChange}
                    name="contactForm"
                  />
                }
                label="Formulaire de contact"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={options.googleMaps}
                    value={options.googleMaps}
                    onChange={handleChange}
                    name="googleMaps"
                  />
                }
                label="Google maps"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={options.translation}
                    value={options.translation}
                    onChange={handleChange}
                    name="translation"
                  />
                }
                label="Traduction multilingue"
              />
              <FormHelperText>Disponible prochainement</FormHelperText>
            </FormGroup>
          </FormControl>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateOptions: (options, restoId) =>
      dispatch(updateOptions(options, restoId)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      where: ["ownerId", "==", props.auth.uid],
    },
  ])
)(Options);
