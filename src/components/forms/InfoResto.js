import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, TextField, Button } from "@material-ui/core";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  createRestaurant,
  editRestaurant,
} from "../../store/actions/restaurantActions";
import { Redirect } from "react-router-dom";
import UploadLogo from "./UploadLogo";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginTop: "6rem",
    marginBottom: "1rem",
    fontFamily: "Archivo narrow",
  },
  titleSpan: {
    color: "#E81B7D",
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
    color: "#e81b7d",
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
    console.log("RESTOCDM", this.props.restaurant)
    if (this.props.match.params.resto && this.props.restaurant) {
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
      console.log("restaurant created", this.state);
    } else {
      this.props.editRestaurant(this.state, restoId);
      console.log("restaurant updated", this.state);
    }
  };

  render() {
    const { classes, auth, restaurant } = this.props;
    console.log("auth uid", auth.uid);
    const resto = (restaurant && restaurant ) || null;
    console.log("restO ", resto && resto.name);

    if (this.state.submited === true) return <Redirect to="/dashboard" />;

    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Typography variant="h1" className={classes.title}>
            <span className={classes.titleSpan}>L</span>es informations sur
            votre établissement
          </Typography>
          <Typography variant="body1">
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
              label="nom de l'établisement"
              onChange={this.handleChange}
              defaultValue={resto && resto.name}
            />
            <TextField
              id="adress"
              label="adresse"
              onChange={this.handleChange}
              defaultValue={resto ? resto.adress : ""}
            />
            <TextField
              id="city"
              label="ville"
              onChange={this.handleChange}
              defaultValue={resto ? resto.city : ""}
            />
            <TextField
              id="postalCode"
              label="code postal"
              onChange={this.handleChange}
              defaultValue={resto ? resto.postalCode : ""}
            />
            <TextField
              id="phone"
              type="tel"
              label="numéro de téléphone"
              onChange={this.handleChange}
              defaultValue={resto ? resto.phone : ""}
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
