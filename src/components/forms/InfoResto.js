import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, TextField, Button, Card } from "@material-ui/core";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  createRestaurant,
  editRestaurant,
} from "../../store/actions/restaurantActions";
import { Redirect } from "react-router-dom";
import UploadLogo from "./UploadLogo";
import HEADER from "../../assets/landingPage/illustration-header.png";
import Geocode from "react-geocode";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "date-fns";
import ROOF from "../../assets/infoResto-icons/roof.png";
import CONTACT from "../../assets/infoResto-icons/contact.png";
import ADRESS from "../../assets/infoResto-icons/adress.png";
import HOURS from "../../assets/infoResto-icons/hours.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  restoIllustration: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      width: "60%",
      justifyContent: "center",
      paddingLeft: "4rem",
    },
  },
  title: {
    marginTop: "6rem",
    marginBottom: "1rem",
    marginLeft: "5%",
    fontFamily: "Archivo narrow",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "4rem",
      fontSize: "3rem",
    },
  },
  titleSpan: {
    color: "#E81B7D",
  },
  subtitle: {
    marginLeft: "5%",
    fontFamily: "Archivo narrow",
    marginTop: "2rem",
    marginBottom: "2rem",
    color: "#E81B7D",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "4rem",
    },
  },
  form: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      paddingRight: "4rem",
    },
  },
  formPart: {
    marginTop: "1rem",
    paddingLeft: "1rem",
    paddingBottom: "1rem",
    paddingRight: "1rem",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  formIcons: {
    width: "10%",
    marginLeft: "45%",
    marginTop: "1rem",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginLeft: "5%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      marginLeft: "15%",
    },
  },
  validationButton: {
    marginTop: "2rem",
    position: "right",
    color: "#e81b7d",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
      marginLeft: "20%",
    },
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
  },
  logoUpload: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  daysOffContainer: {
    marginTop: "1.5rem",
    backgroundColor: "white",
  },
  daysList: {
    display: "flex",
    flexDirection: "column",
  },
  openAndClose: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  timeInput: {
    width: "7.2rem",
  },
  subcard: {
    backgroundColor: "white",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  service: {
    textAlign: "center",
    paddingTop: "1rem",
  },
});

class InfoResto extends Component {
  state = {
    ownerId: "",
    name: "",
    adress: "",
    city: "",
    email: "",
    postalCode: null,
    facebook: "",
    instagram: "",
    phone: "",
    submited: false,
    latitude: null,
    longitude: null,
    daysOff: [],
    opening: null,
    closing: null,
    lunchStart: null,
    lunchEnd: null,
    dinerStart: null,
    dinerEnd: null,
    options: {
      carousel: true,
      dishPic: true,
      contactForm: true,
      googleMaps: true,
      translation: false,
    },
  };

  componentDidMount() {
    if (this.props.restaurant) {
      this.setState({
        name: this.props.restaurant.name,
        adress: this.props.restaurant.adress,
        email: this.props.restaurant.email,
        city: this.props.restaurant.city,
        postalCode: this.props.restaurant.postalCode,
        facebook: this.props.restaurant.facebook,
        instagram: this.props.restaurant.instagram,
        template: this.props.restaurant.template,
        latitude: this.props.restaurant.latitude,
        longitude: this.props.restaurant.longitude,
        daysOff: this.props.restaurant.daysOff,
        opening: this.props.restaurant.opening,
        closing: this.props.restaurant.closing,
        lunchStart: this.props.restaurant.lunchStart,
        lunchEnd: this.props.restaurant.lunchEnd,
        dinerStart: this.props.restaurant.dinerStart,
        dinerEnd: this.props.restaurant.dinerEnd,
        options: this.props.restaurant.options,
        submited: false,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.handleGeocode();
    this.handleDaysOff();
  };

  handleGeocode = () => {
    Geocode.setApiKey(process.env.REACT_APP_FIREBASE_API_KEY);
    Geocode.setLanguage("fr");
    Geocode.setRegion("fr");
    Geocode.fromAddress(
      `${this.state.adress}, ${this.state.postalCode}, ${this.state.city}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ latitude: lat, longitude: lng });
        this.setState({ longitude: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  handleDaysOff = (value) => () => {
    const currentIndex = this.state.daysOff.indexOf(value);
    const newChecked = [...this.state.daysOff];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ daysOff: newChecked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const restoId = this.props.match.params.resto;
    this.setState({ submited: true });
    if (!restoId) {
      this.props.createRestaurant(this.state);
    } else {
      this.props.editRestaurant(this.state, restoId);
    }
  };

  render() {
    const { classes, restaurant } = this.props;
    const resto = (restaurant && restaurant) || null;

    if (this.state.submited === true) return <Redirect to="/dashboard" />;

    return (
      <div className={classes.root}>
        <div className={classes.restoIllustration}>
          <img src={HEADER} alt="illustration" />
        </div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Typography variant="h1" className={classes.title}>
            <span className={classes.titleSpan}>L</span>es informations sur
            votre établissement
          </Typography>
          <Typography className={classes.subtitle}>
            Ces informations sont destinées à être affichées sur votre page.{" "}
            Vous pourrez les modifier ici à tout instant.
          </Typography>
          <div className={classes.inputs}>
            {restaurant && (
              <Card className={classes.formPart}>
                <div className={classes.logoUpload}>
                  <Typography>Logo</Typography>
                  <UploadLogo restaurant={resto} />
                </div>
              </Card>
            )}
            <Card className={classes.formPart}>
              <img src={ROOF} alt="home icon" className={classes.formIcons} />
              <TextField
                id="name"
                type="text"
                label="nom de l'établisement"
                onChange={this.handleChange}
                defaultValue={resto && resto.name}
                required
              />
            </Card>
            <Card className={classes.formPart}>
              <img
                src={ADRESS}
                alt="adress icon"
                className={classes.formIcons}
              />
              <TextField
                id="adress"
                type="text"
                label="adresse"
                onChange={this.handleChange}
                defaultValue={resto ? resto.adress : ""}
                required
              />
              <TextField
                id="postalCode"
                label="code postal"
                type="number"
                onChange={this.handleChange}
                defaultValue={resto ? resto.postalCode : ""}
                required
              />
              <TextField
                id="city"
                label="ville"
                type="text"
                onChange={this.handleChange}
                defaultValue={resto ? resto.city : ""}
                required
              />
            </Card>
            <Card className={classes.formPart}>
              <img
                src={CONTACT}
                alt="contact icon"
                className={classes.formIcons}
              />

              <TextField
                id="phone"
                type="tel"
                label="numéro de téléphone"
                onChange={this.handleChange}
                defaultValue={resto ? resto.phone : ""}
                required
              />
              <TextField
                id="email"
                type="email"
                label="email"
                onChange={this.handleChange}
                defaultValue={resto ? resto.email : ""}
                required
              />
              <TextField
                id="instagram"
                type="url"
                label="votre instagram"
                onChange={this.handleChange}
                defaultValue={resto ? resto.instagram : ""}
              />
              <TextField
                id="facebook"
                type="url"
                label="votre facebook"
                onChange={this.handleChange}
                defaultValue={resto ? resto.facebook : ""}
              />
            </Card>

            <Card className={classes.formPart}>
              <img src={HOURS} alt="hours icon" className={classes.formIcons} />
              <Accordion className={classes.daysOffContainer}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Jours de fermeture</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordion}>
                  <List
                    id="daysOff"
                    defaultValue={resto ? resto.daysOff : ""}
                    className={classes.daysList}
                  >
                    {[
                      "lundi",
                      "mardi",
                      "mercredi",
                      "jeudi",
                      "vendredi",
                      "samedi",
                      "dimanche",
                    ].map((value) => {
                      const labelId = `checkbox-list-secondary-label-${value}`;
                      return (
                        <ListItem key={value} button className={classes.day}>
                          <ListItemText
                            id={labelId}
                            primary={` ${value}`}
                            className={classes.dayText}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              onChange={this.handleDaysOff(value)}
                              checked={this.state.daysOff.indexOf(value) !== -1}
                              inputProps={{ "aria-labelledby": labelId }}
                              className={classes.checkBox}
                              defaultValue={resto ? resto.daysOff : []}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
              <div className={classes.openAndClose}>
                <TextField
                  id="opening"
                  label="heure d'ouverture"
                  type="time"
                  defaultValue={resto ? resto.opening : null}
                  className={classes.timeInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  id="closing"
                  label="heure de fermeture"
                  type="time"
                  defaultValue={resto ? resto.closing : null}
                  className={classes.timeInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={this.handleChange}
                />
              </div>

              <Card className={classes.subcard}>
                <Typography className={classes.service}>
                  Service du midi
                </Typography>
                <div className={classes.openAndClose}>
                  <TextField
                    id="lunchStart"
                    label="début"
                    type="time"
                    defaultValue={resto ? resto.lunchStart : null}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="lunchEnd"
                    label="fin"
                    type="time"
                    defaultValue={resto ? resto.lunchEnd : null}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange}
                  />
                </div>
              </Card>

              <Card className={classes.subcard}>
                <Typography className={classes.service}>
                  Service du soir
                </Typography>
                <div className={classes.openAndClose}>
                  <TextField
                    id="dinerStart"
                    label="début"
                    type="time"
                    defaultValue={resto ? resto.dinerStart : null}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="dinerEnd"
                    label="fin"
                    type="time"
                    defaultValue={resto ? resto.dinerEnd : null}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange}
                  />
                </div>
              </Card>
            </Card>
          </div>

          <div className={classes.buttonsContainer}>
            <Button
              variant="contained"
              type="submit"
              className={classes.validationButton}
              onClick={this.handleSubmit}
            >
              valider
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

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
    createRestaurant: (restaurant) => dispatch(createRestaurant(restaurant)),
    editRestaurant: (restaurant, restoId) =>
      dispatch(editRestaurant(restaurant, restoId)),
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
)(InfoResto);
