import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import {
  Typography,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
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
    fontFamily: "Archivo narrow",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "4rem",
      fontSize: "3rem"
    },
  },
  titleSpan: {
    color: "#E81B7D",
  },
  subtitle: {
    fontFamily: "Archivo narrow",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "4rem",
    },
  },
  form: {
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      paddingRight: "4rem",
    },
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
});

class InfoResto extends Component {
  state = {
    ownerId: "",
    name: "",
    adress: "",
    city: "",
    postalCode: null,
    facebook: "",
    instagram: "",
    phone: "",
    submited: false,
  };

  componentDidMount() {
    if (this.props.restaurant) {
      this.setState({
        name: this.props.restaurant.name,
        adress: this.props.restaurant.adress,
        city: this.props.restaurant.city,
        postalCode: this.props.restaurant.postalCode,
        facebook: this.props.restaurant.facebook,
        instagram: this.props.restaurant.instagram,
        template: this.props.restaurant.template,
        submited: false,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
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
    const { classes, auth, restaurant } = this.props;
    const resto = (restaurant && restaurant) || null;

    if (this.state.submited === true) return <Redirect to="/dashboard" />;

    window.scrollTo(0, 0)

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
            Ces informations seront disponibles sur votre page.{" "}
          </Typography>
          <div className={classes.inputs}>
            {restaurant && (
              <div className={classes.logoUpload}>
                <Typography>Logo</Typography>
                <UploadLogo restaurant={resto} />
              </div>
            )}
            <TextField
              id="name"
              type="text"
              label="nom de l'établisement"
              onChange={this.handleChange}
              defaultValue={resto && resto.name}
              required
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
              id="city"
              label="ville"
              type="text"
              onChange={this.handleChange}
              defaultValue={resto ? resto.city : ""}
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
              id="phone"
              type="tel"
              label="numéro de téléphone"
              onChange={this.handleChange}
              defaultValue={resto ? resto.phone : ""}
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
